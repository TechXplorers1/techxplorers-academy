import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'; // Import auth only

// Eye Icon SVG component with CORRECT logic
const EyeIcon = ({ onClick, isVisible }) => (
    <button type="button" onClick={onClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-purple-600 transition-colors">
        {isVisible ? (
            // Slashed Eye: Password IS VISIBLE, clicking will hide it
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.77 0 8.35 3.33 10 7-1.42 2.65-4.22 4.67-7.44 5.34" />
                <path d="M2.72 2.72 2 3.44l2.84 2.84c-1.74 1.13-3.23 2.5-4.84 4.88 1.65 2.52 4.13 4.54 7.63 5.25" />
                <line x1="2" y1="22" x2="22" y2="2" strokeWidth="2"/>
            </svg>
        ) : (
            // Open Eye: Password IS HIDDEN, clicking will show it
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )}
    </button>
);

const LoginPage = ({ setIsLoggedIn, cartItemsCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      // Redirect to the root path
      navigate('/'); 
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-inter text-gray-900 relative">
      <Header cartItemsCount={cartItemsCount} /> 
      
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-4xl p-8 md:p-12 bg-white rounded-3xl shadow-2xl my-20 mx-4 overflow-hidden transform transition-all duration-500">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: Visuals */}
          <div className="relative hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl transition-transform duration-500 transform-gpu">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Welcome Back!
              </h2>
              <p className="text-lg text-purple-100 text-center mb-8">
                Log in to access your dashboard, courses, and community.
              </p>
              <Link
                to="/signup"
                className="relative z-20 px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </div>
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"></div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-4">
            <h2 className="text-center text-3xl font-bold mb-8">
              Log In
            </h2>
            
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="login-email" className="sr-only">Email address</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <label htmlFor="login-password" className="sr-only">Password</label>
                <input
                  id="login-password"
                  name="password"
                  // Toggle type between password and text
                  type={showPassword ? "text" : "password"} 
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {/* Password toggle button */}
                <EyeIcon 
                    onClick={() => setShowPassword(!showPassword)} 
                    isVisible={showPassword} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  {/* Link to the new ForgotPasswordPage */}
                  <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <span className="w-full border-t border-gray-300"></span>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <span className="w-full border-t border-gray-300"></span>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 shadow-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={true}
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.61 20.485c-.328-1.57-.964-3.08-1.84-4.524H24v8.528h11.838c-.524 2.85-2.128 5.253-4.512 6.852l7.152 5.568c4.136-3.81 6.552-9.458 6.552-16.42z" fill="#4285F4"/><path d="M24 44c6.264 0 11.536-2.072 15.384-5.612l-7.152-5.568c-2.032 1.34-4.644 2.128-8.232 2.128-6.31 0-11.666-4.254-13.626-9.988L3.13 32.22c4.198 8.35 12.83 14.78 20.87 14.78z" fill="#34A853"/><path d="M10.374 24.004c-.496-1.52-.77-3.13-.77-4.808 0-1.678.274-3.288.77-4.808l-6.85-5.32c-1.92 3.896-2.994 8.24-2.994 12.868s1.074 8.972 2.994 12.868z" fill="#FBBC04"/><path d="M24 7.558c3.272 0 6.136 1.12 8.444 3.298L40.7 4.298C36.852 1.638 31.816 0 24 0 16.096 0 9.42 2.934 3.13 8.34L10.374 13.616c1.96-5.734 7.316-9.988 13.626-9.988z" fill="#EA4335"/></svg>
                Sign in with Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 shadow-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={true}
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.093 3.111 9.431 7.545 11.082V14.15h-2.69v-2.15h2.69V9.587c0-2.664 1.583-4.133 4.02-4.133 1.155 0 2.154.204 2.443.294v2.53h-1.55c-1.226 0-1.464.582-1.464 1.442v1.897h2.812l-.462 2.15h-2.35V23.082C19.89 21.43 24 17.093 24 12 24 5.373 18.627 0 12 0z"/></svg>
                Sign in with Facebook
              </button>
            </div>

            <div className="mt-8 md:hidden text-center text-sm">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                      Sign up
                    </Link>
                </p>
            </div>
          </div>
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

export default LoginPage;