import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-2xl font-bold text-center mb-8">Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/menu" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Manage Menu
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Manage Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Reports & Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Orders Today</h3>
            <p className="text-3xl font-bold text-green-500">50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Revenue Today</h3>
            <p className="text-3xl font-bold text-green-500">$500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">New Menu Items</h3>
            <p className="text-3xl font-bold text-green-500">5</p>
          </div>
        </div>

        {/* Menu Management Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Manage Menu</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600">
              Add New Item
            </button>
            <table className="mt-6 w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Item Name</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* You can dynamically render rows here */}
                <tr>
                  <td className="py-2 px-4">Pizza Margherita</td>
                  <td className="py-2 px-4">$12.99</td>
                  <td className="py-2 px-4">Meals</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button className="ml-4 text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
                {/* More rows */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Manage Orders</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Customer</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* You can dynamically render rows here */}
                <tr>
                  <td className="py-2 px-4">#1234</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">$40.99</td>
                  <td className="py-2 px-4">Processing</td>
                  <td className="py-2 px-4">
                    <button className="text-green-500 hover:text-green-700">Mark as Completed</button>
                    <button className="ml-4 text-red-500 hover:text-red-700">Cancel</button>
                  </td>
                </tr>
                {/* More rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;