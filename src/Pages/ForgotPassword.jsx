import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize toast notifications
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://backendpingpal.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        notifySuccess('Check your email for a password reset link.');
        setTimeout(() => navigate('/login'), 5000); // Redirect to login after 5 seconds
      } else {
        notifyError(data.message || 'An error occurred.');
      }
    } catch (error) {
      notifyError('Error connecting to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email address, and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md transition duration-200 ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-green-500 hover:underline text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
