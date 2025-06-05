import axios from 'axios';

const API_BASE = 'http://localhost';

export const registerUser = (data) =>
  axios.post(`${API_BASE}:8000/register`, {
    username: data.name,
    password: data.password
  });

export const loginUser = (data) =>
  axios.post(`${API_BASE}:8000/login`, data);

export const createPost = (token, data) =>
  axios.post(`${API_BASE}:3001/posts`, {
    user_id: data.userId,
    content: data.content
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const likePost = (postId, userId) =>
  axios.post(`${API_BASE}:3001/posts/${postId}/like`, { user_id: userId });
