import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';

const ForgotPasswordPage = ({ cartItemsCount }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');
    
    // Helper function to map Firebase error codes to friendly messages
    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
            case 'auth/invalid-email':
                return "The email address you entered is not registered or is invalid. Please check and try again.";
            case 'auth/network-request-failed':
                return "Network error. Please check your internet connection and try again.";
            default:
                return "Failed to send password reset link. Please check your email address and verify Firebase settings.";
        }
    };

    try {
      // Firebase function to send the reset email
      await sendPasswordResetEmail(auth, email);
      // NOTE: Firebase intentionally displays success regardless of account existence
      setMessage("Success! If an account exists for that email, a password reset link has been sent. Check your inbox and spam folder.");
      setEmail('');
    } catch (err) {
      console.error("Password reset error:", err);
      // Use the friendly error message
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-inter text-gray-900 relative">
      <Header cartItemsCount={cartItemsCount} />
      
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-lg p-8 md:p-12 bg-white rounded-3xl shadow-2xl my-20 mx-4 overflow-hidden transform transition-all duration-500">
        <h2 className="text-center text-3xl font-bold mb-8 text-purple-600">
          Reset Your Password
        </h2>
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleResetSubmit}>
          <p className="text-gray-600 text-center">
            Enter the email address associated with your account. We'll send you a link to reset your password via Firebase.
          </p>
          <div>
            <label htmlFor="reset-email" className="sr-only">Email address</label>
            <input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || message}
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              disabled={isLoading || message}
            >
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Back to Login
            </Link>
        </div>
      </div>
      
      <Footer />

      <style>{`
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;