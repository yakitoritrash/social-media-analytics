// src/Feed.js
import { useEffect, useState } from "react";
import { likePost } from "./api";
import socket from "./socket";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Dummy data (replace with real fetch later)
    setPosts([
      { id: "post1", content: "Hello world!", likes: 0 },
      { id: "post2", content: "Another post", likes: 0 }
    ]);

    socket.on("likeUpdate", ({ postId, likes }) => {
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, likes } : p))
      );
    });

    return () => socket.off("likeUpdate");
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePost(postId, userId);
    } catch (err) {
      alert("Failed to like post");
    }
  };

  return (
    <div>
      <h3>Feed</h3>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post.id)}>Like</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

