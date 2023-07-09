//server.js : entry point of the backend

const express = require('express');
const cors = require('cors');
const {verifyToken} = require('./middleware/auth');
const connectdb = require('./middleware/db');

const app = express();

connectdb();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request body

app.post('/api/auth/google', (req, res) => verifyToken(req, res));
app.use("/api/v1", require('./routes/learningpathRoutes'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
