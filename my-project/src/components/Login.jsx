import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/white.avif')" }}>
      <div className="bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Log In</h2>
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Sign-Up Link */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          Dont have an account?{' '}
          <Link to="/signUp" className="text-green-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Back to Home Button */}
        <div className="mt-4">
          <Link
            to="/"
            className="block text-center bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
