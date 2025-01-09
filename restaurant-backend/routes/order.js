const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/users');
const MenuItem = require('../models/MenuItem');

// Place a new order
router.post('/place-order', async (req, res) => {
  const { userId, items } = req.body; // Assuming userId and items are sent from the frontend

  try {
    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Calculate the total price of the order
    let totalPrice = 0;
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(400).json({ message: 'Menu item not found' });
      }
      totalPrice += menuItem.price * item.quantity;
    }

    // Create the order
    const order = new Order({
      user: userId,
      items: items.map(item => ({
        menuItem: item.menuItemId,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
