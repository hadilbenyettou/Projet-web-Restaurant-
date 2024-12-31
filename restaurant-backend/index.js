const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const menuItemRoutes = require('./routes/menuItemRoutes'); 

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());  // This allows all origins by default (you can configure this more specifically if needed)

// Parse incoming JSON requests
app.use(express.json());

console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant API');
});

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api', menuItemRoutes);
// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.listen(5000, () => console.log('Server is running on port 5000'));
