// src/App.js
import { useState, useEffect } from "react";
import Login from "./Login";
import PostForm from "./PostForm";
import Feed from "./Feed";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Dummy userId for testing

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user?.id) {
      setToken(user.token);
      setUserId(user.id);
    }
  }, []);

  if (!token) {
    return <Login setToken={setToken} setUserId={setUserId}/>;
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

