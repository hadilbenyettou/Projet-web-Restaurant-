const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); 

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
// Fetch all users route (Admin only)
router.get('/users', authMiddleware, async (req, res) => {
  try {
    // Check if the user is authorized (only admins can fetch users)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Fetch all users, excluding passwords
    const users = await User.find({}, '-password'); // -password excludes password
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/users', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role || 'customer',
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.delete('/users/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/users/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
