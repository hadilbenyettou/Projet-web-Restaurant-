// models/MenuItem.js

const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: [
      'Meals', 
      'Drinks', 
      'Desserts', 
      'Specials',
      'Sides'
    ], 
    message: '{VALUE} is not a valid category' // Error message if category is invalid
  },
  imageUrl: { type: String }, // URL of the image
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;
