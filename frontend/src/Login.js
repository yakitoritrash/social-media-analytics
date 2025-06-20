// src/Login.js
import { useState } from "react";
import { registerUser, loginUser } from "./api";

export default function Login({ setToken, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ name, email, password });
      alert("Registered successfully. You can now log in.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username: name, password });

      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token, id: res.data.id })
      );
      setToken(res.data.token);
      setUserId(res.data.id);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

