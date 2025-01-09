import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/users', newUser, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      if (response.status === 201) {
        setUsers([...users, response.data.user]);
        setNewUser({ name: '', email: '', password: '', role: 'customer' });
        setError('User created successfully!');
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
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== id)); // Remove user from state
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
      const response = await axios.put(`http://localhost:5000/api/auth/users/${selectedUser._id}`, selectedUser, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setUsers(users.map(user => user._id === selectedUser._id ? response.data.user : user));
        setSelectedUser(null); // Clear selected user
        setError('User updated successfully!');
      } else {
        setError('Error updating user.');
      }
    } catch (err) {
      setError('Error updating user.');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Page</h1>

      {/* Success or Error Messages */}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Create User Form */}
      <form onSubmit={handleCreateUser} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 mb-2 w-full"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create User</button>
      </form>

      {/* Update User Form */}
      {selectedUser && (
        <form onSubmit={handleUpdateUser} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Update User</h2>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <select
            value={selectedUser.role}
            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
            className="border p-2 mb-2 w-full"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2">Update User</button>
        </form>
      )}

      {/* Users Table */}
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
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
