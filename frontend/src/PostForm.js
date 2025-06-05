import { useState } from "react";
import { createPost } from "./api";

export default function PostForm({ token, userId }) {
  const [content, setContent] = useState("");

  const handlePost = async() => {
    try {
      await createPost(token, { userId, content });
      setContent("");
      alert("Post created");
      setContent("");
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <div>
      <h3>Create Post</h3>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <br />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}
