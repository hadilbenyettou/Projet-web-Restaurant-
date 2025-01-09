const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/users');
const MenuItem = require('../models/MenuItem');
const authMiddleware = require('../middleware/authMiddleware');

// Place a new order
router.post('/place-order', authMiddleware, async (req, res) => {
  const { items , address, phone } = req.body; // Items sent from the frontend
  const userId = req.user.id; // Extracted from the middleware
  if (!address || !phone) {
    return res.status(400).json({ message: 'Address and phone number are required' });
  }
  try {
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
      address,
      phone,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Fetch all orders
router.get('/', authMiddleware, async (req, res) => {
  console.log('GET /api/orders called');
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // Populate user information (name, email)
      .populate('items.menuItem', 'name price'); // Populate menu item information (name, price)
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Mark an order as delivered
router.put('/:id/mark-delivered', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'Completed'; // Update the status to "Completed"
    await order.save();

    res.status(200).json({ message: 'Order marked as delivered', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an order
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.deleteOne(); // Use deleteOne() instead of remove()
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
