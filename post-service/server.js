const express = require('express');
const app = express();
app.use(express.json());
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['localhost'],
  keyspace: 'twitter'
});

app.get('/test', (req, res) => {
  res.send("Post service running!");
});

app.listen(3000, () => console.log('Post service on port 3000'));
