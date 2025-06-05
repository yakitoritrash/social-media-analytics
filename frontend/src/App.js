// src/App.js
import { useState } from "react";
import Login from "./Login";
import PostForm from "./PostForm";
import Feed from "./Feed";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("a22c1b15-8dce-4c28-b4b6-16784e50b2ff"); // Dummy userId for testing

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <h1>Social Dashboard</h1>
      <PostForm token={token} userId={userId} />
      <Feed userId={userId} />
    </div>
  );
}

export default App;

