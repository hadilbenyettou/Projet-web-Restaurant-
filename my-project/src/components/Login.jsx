import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // Import animations

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save JWT token in localStorage
        localStorage.setItem('token', data.token);

        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/page'), 2000); // Redirect to Page.jsx after 2 seconds
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-beige-100">
      {/* Glassmorphism Card with Advanced Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white/70 backdrop-blur-md rounded-lg shadow-2xl p-8 w-full max-w-md border border-white/20 relative overflow-hidden"
      >
        {/* Floating Background Shapes */}
        <motion.div
          initial={{ x: -100, y: -100, rotate: -45 }}
          animate={{ x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-green-200/30 rounded-full blur-2xl"
        />
        <motion.div
          initial={{ x: 100, y: 100, rotate: 45 }}
          animate={{ x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-brown-200/30 rounded-full blur-2xl"
        />

        <h2 className="text-4xl font-bold text-center text-brown-800 mb-8">Log In</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-brown-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 pl-10 border border-brown-300 rounded-md bg-white/70 text-brown-800 placeholder-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
              <FaEnvelope className="absolute left-3 top-3.5 text-brown-500" />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-brown-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pl-10 border border-brown-300 rounded-md bg-white/70 text-brown-800 placeholder-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
              <FaLock className="absolute left-3 top-3.5 text-brown-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-brown-500 hover:text-brown-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
              </button>
            </div>
          </div>

          {/* Login Button with Advanced Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brown-600 to-brown-700 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:from-brown-700 hover:to-brown-800 transition-all duration-300"
            >
              Log In
            </button>
          </motion.div>
        </form>

        {/* Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-center text-red-600 bg-red-100/70 py-2 px-4 rounded-md"
          >
            {message}
          </motion.div>
        )}

        {/* Sign-Up Link */}
        <p className="mt-8 text-sm text-brown-600 text-center">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-brown-700 font-medium hover:underline hover:text-brown-800"
          >
            Sign Up
          </Link>
        </p>

        {/* Back to Home Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="block text-center bg-brown-100 text-brown-700 py-2 px-4 rounded-md shadow hover:bg-brown-200 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;