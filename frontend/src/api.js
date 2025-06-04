import axios from 'axios';

const API_BASE = 'http://localhost';

export const registerUser = (data) =>
  axios.post(`${API_BASE}:8000/api/register`, data);

export const loginUser = (data) =>
  axios.post(`${API_BASE}:8000/api/llogin`, data);

export const createPost = (token, data) =>
  axios.post(`${API_BASE}:3000/posts`, data, {
    header: { Authorization: `Bearer ${token}` }
  });

export const likePost = (postId, userId) =>
  axios.post(`${API_BASE}:3001/posts/${postId}/like`, { user_id: userId });
