const mongoose = require('mongoose');
require('dotenv').config();

// Add a log before connecting
console.log('Attempting to connect to MongoDB Atlas...');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        
        // Start the server only after MongoDB connection is successful
        console.log('Server started...');
        // You can add your server code here, for example:
        // app.listen(5000, () => console.log('Server is running on port 5000'));
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
