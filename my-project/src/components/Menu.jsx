import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Menu = ({ searchQuery = '', selectedCategory = 'All', addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu-items');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Group and filter menu items
  const groupItemsByCategory = (items) => {
    return items.reduce((grouped, item) => {
      const { category } = item;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
      return grouped;
    }, {});
  };

  // Filter items based on search query and selected category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = groupItemsByCategory(filteredItems);

  // Render the menu items
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-brown-600 animate-pulse">Loading Menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-brown-800 mb-12">Our Menu</h2>
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="mb-12">
          <h3 className="text-3xl font-bold text-brown-800 mb-8 border-b-2 border-brown-600 pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {groupedItems[category].map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-2 hover:border-gold-500"
              >
                <img
                  src={item.imageUrl || '/images/placeholder.jpg'}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-brown-800 mb-3">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <p className="text-xl font-bold text-green-600 mb-4">{item.price} DA</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-3 px-6 bg-brown-600 text-white font-semibold rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Add prop validation
Menu.propTypes = {
  searchQuery: PropTypes.string,
  selectedCategory: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
};

// Default props
Menu.defaultProps = {
  searchQuery: '',
  selectedCategory: 'All',
};

export default Menu;