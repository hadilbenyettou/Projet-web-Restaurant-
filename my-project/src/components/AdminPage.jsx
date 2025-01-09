import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', description: '', category: '', imageUrl: '' });

  // Fetch users, orders, and menu items when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch users
        const usersResponse = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);

        // Fetch orders
        const ordersResponse = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersResponse.data);

        // Fetch menu items
        const menuItemsResponse = await axios.get('http://localhost:5000/api/menu-items', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems(menuItemsResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        setUsers([...users, response.data.user]);
        setNewUser({ name: '', email: '', password: '', role: 'customer' });
        setSuccessMessage('User created successfully!');
      } else {
        setError('Error creating user.');
      }
    } catch (err) {
      setError('Error creating user.');
      console.error(err);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id)); // Remove user from state
        setSuccessMessage('User deleted successfully!');
      } else {
        setError('Failed to delete user. Please try again.');
      }
    } catch (err) {
      setError('Error deleting user.');
      console.error(err); // Log the error for better debugging
    }
  };

  // Handle user editing (show form with selected user data)
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  // Handle user update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/auth/users/${selectedUser._id}`,
        selectedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setUsers(users.map((user) => (user._id === selectedUser._id ? response.data.user : user)));
        setSelectedUser(null); // Clear selected user
        setSuccessMessage('User updated successfully!');
      } else {
        setError('Error updating user.');
      }
    } catch (err) {
      setError('Error updating user.');
      console.error(err);
    }
  };

  // Handle menu item creation
  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/menu-items', newMenuItem, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        setMenuItems([...menuItems, response.data]);
        setNewMenuItem({ name: '', price: '', description: '', category: '', imageUrl: '' });
        setSuccessMessage('Menu item created successfully!');
      } else {
        setError('Error creating menu item.');
      }
    } catch (err) {
      setError('Error creating menu item.');
      console.error(err);
    }
  };

  // Handle menu item deletion
  const handleDeleteMenuItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/menu-items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setMenuItems(menuItems.filter((item) => item._id !== id)); // Remove menu item from state
        setSuccessMessage('Menu item deleted successfully!');
      } else {
        setError('Failed to delete menu item. Please try again.');
      }
    } catch (err) {
      setError('Error deleting menu item.');
      console.error(err);
    }
  };

  // Mark an order as delivered
  const handleMarkDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/mark-delivered`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'Completed' } : order
          )
        );
        setSuccessMessage('Order marked as delivered!');
      } else {
        setError('Failed to mark order as delivered.');
      }
    } catch (err) {
      setError('Error marking order as delivered.');
      console.error(err);
    }
  };

  // Delete an order
  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        setSuccessMessage('Order deleted successfully!');
      } else {
        setError('Failed to delete order.');
      }
    } catch (err) {
      setError('Error deleting order.');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Success or Error Messages */}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* User Management Section */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h2>

        {/* Create User Form */}
        <form onSubmit={handleCreateUser} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Create New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create User
          </button>
        </form>

        {/* Update User Form */}
        {selectedUser && (
          <form onSubmit={handleUpdateUser} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Update User</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Update User
            </button>
          </form>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Management Section */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total Price</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Created At</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {order.items.map((item) => (
                      <div key={item.menuItem._id}>
                        {item.menuItem.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.address}</td>
                  <td className="px-6 py-4">{order.phone}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {order.status !== 'Completed' && (
                      <button
                        onClick={() => handleMarkDelivered(order._id)}
                        className="bg-green-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Menu Item Management Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Menu Item Management</h2>

        {/* Create Menu Item Form */}
        <form onSubmit={handleCreateMenuItem} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Create New Menu Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newMenuItem.category}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Meals">Meals</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Specials">Specials</option>
              <option value="Sides">Sides</option>
            </select>
            <input
              type="text"
              placeholder="Image URL"
              value={newMenuItem.imageUrl}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, imageUrl: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Menu Item
          </button>
        </form>

        {/* Menu Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Image URL</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.imageUrl}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteMenuItem(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;