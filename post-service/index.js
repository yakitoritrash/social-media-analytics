const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cassandra = require('cassandra-driver');

const app = express();
app.use(express.json());

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'social'
});

client.connect()
  .then(() => console.log('Connected to cassandra'))
  .catch(err => console.error('Connection error', err));

app.post('/posts', async (req, res) => {
  const { user_id, content } = req.body;
  const post_id = uuidv4();
  const created_at = new Date();

  const query = 'INSERT INTO posts (post_id, user_id, content, created_at, likes, comments) VALUES (?, ?, ?, ?, 0, [])'
  try {
    await client.execute(query, [post_id, user_id, content, created_at], { prepare: true});
    res.status(201).json({ post_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.post('/posts/:id/like', async(req, res) => {
  const query = 'UPDATE posts SET likes = likes + 1 WHERE post_id = ?';
  try {
    await client.execute(query, [req.params.id], { prepare: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  } 
});

app.post('/posts/:id/comment', async (req, res) => {
  const { comment } = req.body;
  const query = 'UPDATE posts SET comments = comments + [?] WHERE post_id = ?';
  try {
    await client.execute(query, [comment, req.params.id], { prepare: true });
    res.sendStatus(200);
  } catch {
    res.status(500).json({ error: 'Failed to comment' });
  }
});

app.get('/posts/:id', async(req, res) => {
  const query = 'SELECT * FROM posts WHERE post_id = ?';
  try {
    const result = await client.execute(query, [req.params.id], { prepare: true });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.listen(3001, () => console.log('Post service running on port 3001'));
