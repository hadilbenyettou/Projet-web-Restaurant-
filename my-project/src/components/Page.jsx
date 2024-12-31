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
    setCartItems([...cartItems, item]);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
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
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
            />
            <div className="relative">
              <button className="bg-beige text-white px-4 py-2 rounded-lg hover:bg-gold-600">
                Cart ({cartItems.length})
              </button>
              {/* Cart Dropdown */}
              {cartItems.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center mb-2">
                      <span className="text-gray-800">{item.name}</span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'All' ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('Meals')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'Meals' ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Meals
            </button>
            <button
              onClick={() => setSelectedCategory('Drinks')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'Drinks' ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Drinks
            </button>
            <button
              onClick={() => setSelectedCategory('Desserts')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'Desserts' ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Desserts
            </button>
            <button
              onClick={() => setSelectedCategory('Sides')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'Sides' ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Sides
            </button>
            <button
              onClick={() => setSelectedCategory('Specials')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'Specials' ? 'bg-brown-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Specials
            </button>
          </div>
          <Menu searchQuery={searchQuery} selectedCategory={selectedCategory} addToCart={addToCart} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;