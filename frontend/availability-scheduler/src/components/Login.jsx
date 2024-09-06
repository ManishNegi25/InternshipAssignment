import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", { email });
      localStorage.setItem('userToken', response.data.token);
      window.location.href = '/availability';
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full transform hover:scale-105 transition-transform duration-300 ease-out">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Welcome 
        </h2>
        {error && (
          <div className="text-red-600 mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 pr-12 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
