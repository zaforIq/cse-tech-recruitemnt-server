require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3001;
const MONGODB_URI = "mongodb+srv://xoy4444_db_user:4JHcmevahpHo818D@cluster0.wlsf0s7.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
