const express = require('express');
const cors = require('cors');
const path = require('path');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', candidateRoutes);

// Health
app.get('/', (req, res) => res.send('recruitemnt-server is running'));

module.exports = app;
