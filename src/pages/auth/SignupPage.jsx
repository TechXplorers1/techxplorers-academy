import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from '../../firebase';

// Eye Icon SVG component (reused and corrected)
const EyeIcon = ({ onClick, isVisible }) => (
    <button type="button" onClick={onClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-purple-600 transition-colors">
        {isVisible ? (
            // Icon when password IS visible (should be the 'slashed out' eye or hide icon)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.77 0 8.35 3.33 10 7-1.42 2.65-4.22 4.67-7.44 5.34" />
                <path d="M2.72 2.72 2 3.44l2.84 2.84c-1.74 1.13-3.23 2.5-4.84 4.88 1.65 2.52 4.13 4.54 7.63 5.25" />
                <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
        ) : (
            // Icon when password IS NOT visible (should be the 'open' eye or show icon)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )}
    </button>
);

const SignupPage = ({ setIsLoggedIn, cartItemsCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    if (signupForm.password !== signupForm.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
      const user = userCredential.user;

      // Create a user entry in Realtime Database with first name, last name, and role
      const userRef = ref(db, 'users/' + user.uid);
      await set(userRef, {
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
        email: signupForm.email,
        role: 'user', // Assign role as user
        cart: {},
        wishlist: {},
        enrolledCourses: {},
        registeredLiveClasses: {}
      });

      setIsLoggedIn(true);
      // Redirect to the root path
      navigate('/');
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prevState => ({
      ...prevState,
      [name]: value
    }));
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
                Join Our Community
              </h2>
              <p className="text-lg text-purple-100 text-center mb-8 max-w-xs">
                Create an account to start your journey in tech and access all our resources.
              </p>
              <Link
                to="/login"
                className="relative z-20 px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                Log In
              </Link>
            </div>
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"></div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-4">
            <h2 className="text-center text-3xl font-bold mb-8">
              Sign Up
            </h2>
            
            <form className="space-y-6" onSubmit={handleSignupSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="sr-only">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                            placeholder="First Name"
                            value={signupForm.firstName}
                            onChange={handleSignupChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="sr-only">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                            placeholder="Last Name"
                            value={signupForm.lastName}
                            onChange={handleSignupChange}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            <div>
              <label htmlFor="signup-email" className="sr-only">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Email address"
                value={signupForm.email}
                onChange={handleSignupChange}
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <label htmlFor="signup-password" className="sr-only">Password</label>
              <input
                id="signup-password"
                name="password"
                // Toggle type between password and text
                type={showPassword ? "text" : "password"} 
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Password"
                value={signupForm.password}
                onChange={handleSignupChange}
                disabled={isLoading}
              />
              {/* Password toggle button */}
              <EyeIcon 
                  onClick={() => setShowPassword(!showPassword)} 
                  isVisible={showPassword} 
              />
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                // Toggle type between password and text
                type={showConfirmPassword ? "text" : "password"} 
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Confirm Password"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                disabled={isLoading}
              />
              {/* Confirm Password toggle button */}
              <EyeIcon 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  isVisible={showConfirmPassword} 
              />
            </div>
            {passwordError && (
              <div className="text-sm text-red-600">
                {passwordError}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign up"}
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
                Sign up with Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 shadow-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={true}
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.093 3.111 9.431 7.545 11.082V14.15h-2.69v-2.15h2.69V9.587c0-2.664 1.583-4.133 4.02-4.133 1.155 0 2.154.204 2.443.294v2.53h-1.55c-1.226 0-1.464.582-1.464 1.442v1.897h2.812l-.462 2.15h-2.35V23.082C19.89 21.43 24 17.093 24 12 24 5.373 18.627 0 12 0z"/></svg>
                Sign up with Facebook
              </button>
            </div>

            <div className="mt-8 md:hidden text-center text-sm">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                      Log In
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

export default SignupPage;