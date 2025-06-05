import { useState } from "react";
import { createPost } from "./api";

export default function PostForm({ token, userid }) {
  const [content, setcontent] = useState("");

  const handlepost = async() => {
    try {
      await createPost(token, { userid, content });
      setcontent("");
      alert("post created");
      setcontent("");
    } catch (err) {
      alert("error creating post");
    }
  };

  return (
    <div>
      <h3>create post</h3>
      <textarea value={content} onChange={e => setcontent(e.target.value)} />
      <br />
      <button onClick={handlepost}>post</button>
    </div>
  );
}
