import { useState } from 'react';
import Menu from './Menu';
import Hero from './Hero'; // Import Hero component
import Footer from './Footer'; // Import Footer component

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      // If the item already exists in the cart, increase its quantity
      setCartItems((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0) // Remove the item if quantity is 0
    );
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Place order
  const placeOrder = async () => {
    const userId = 'USER_ID'; // Replace with actual logged-in user ID
    const orderItems = cartItems.map((item) => ({
      menuItemId: item._id,
      quantity: item.quantity, // Use the item's quantity
    }));

    const orderData = {
      userId,
      items: orderItems,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]); // Clear the cart
      } else {
        alert(result.message || 'Error placing order');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brown-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <img
            src="/images/sf.png" // Update the path to your logo
            alt="Restaurant Logo"
            className="h-12" // Adjust the height as needed
          />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
          />
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-4 mb-8">
            {['All', 'Meals', 'Drinks', 'Desserts', 'Sides', 'Specials'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <Menu searchQuery={searchQuery} selectedCategory={selectedCategory} addToCart={addToCart} />
        </div>
      </section>

      {/* Cart Section (Fixed on the right side) */}
      {cartItems.length > 0 && (
        <div className="fixed top-20 right-4 bg-white shadow-lg rounded-lg p-6 w-80 z-50">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-800">{item.name}</span>
                  <span className="text-gray-600 ml-2">(x{item.quantity})</span>
                </div>
                <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;