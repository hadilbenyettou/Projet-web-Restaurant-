const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Sign-up Route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate input fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please provide all required fields (name, email, password).' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the user to the database (password is hashed in the model)
    const newUser = new User({
      name,
      email,
      password, // Password will be hashed automatically
      role : role || 'customer',
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    // Find the user in the database by their email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found in the database');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Passwords do not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token if the password matches
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include the user's role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token back to the client
    res.status(200).json({ token, role: user.role });

  } catch (error) {
    console.error('Error during login process:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
