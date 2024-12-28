const mongoose = require('mongoose');
require('dotenv').config();

// Add a log before connecting
console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Add a log to check if the server is running
console.log('Server started...');
