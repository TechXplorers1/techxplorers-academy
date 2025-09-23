import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';

// All Stacks Pages
import AiAutomation from './pages/all-stacks/AiAutomation';
import CybersecurityCompliance from './pages/all-stacks/CybersecurityCompliance';
import DataAnalytics from './pages/all-stacks/DataAnalytics';
import EngineeringDevelopment from './pages/all-stacks/EngineeringDevelopment';
import FreeStacks from './pages/all-stacks/FreeStacks';
import Marketing from './pages/all-stacks/Marketing';
import ProductStrategy from './pages/all-stacks/ProductStrategy';
import UxUiDesign from './pages/all-stacks/UxUiDesign';

// For Business Pages
import BraveBusiness from './pages/for-business/BraveBusiness';
import HireFromUs from './pages/for-business/HireFromUs';
import PartnerWithUs from './pages/for-business/PartnerWithUs';

// Resources Pages
import BraveStatistics from './pages/resources/BraveStatistics';
import CommunityEvents from './pages/resources/CommunityEvents';
import FreeResources from './pages/resources/FreeResources';
import MasterclassReplays from './pages/resources/MasterclassReplays';
import SuccessStories from './pages/resources/SuccessStories';

// More Pages
import AboutUs from './pages/more/AboutUs';
import BecomeAMentor from './pages/more/BecomeAMentor';
import JoinBraveProjects from './pages/more/JoinBraveProjects';
import JoinBraveTeams from './pages/more/JoinBraveTeams';
import Plans from './pages/more/Plans';
import LiveClasses from './pages/more/LiveClasses';

// Course Details Page
import CourseDetailsTemplate from './pages/course-details/CourseDetailsTemplate';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/dashboard/MyProfile';
import EnrolledCourses from './pages/dashboard/EnrolledCourses';
import Wishlist from './pages/dashboard/Wishlist';
import OrderHistory from './pages/dashboard/OrderHistory';
import Settings from './pages/dashboard/Settings';
import MyLiveClasses from './pages/dashboard/MyLiveClasses';
import LiveClassRecordings from './pages/dashboard/LiveClassRecordings';

// Course Page
import CoursePage from './pages/dashboard/CoursePage'; 

// Import the new CartPage component
import CartPage from './pages/CartPage';

// Import the new SearchPage component
import SearchPage from './pages/SearchPage';

import { coursesData } from './data/coursesData';
import { liveClassesData } from './data/liveClassesData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage:", error);
      return [];
    }
  });

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const savedEnrolledCourses = localStorage.getItem('enrolledCourses');
      return savedEnrolledCourses ? JSON.parse(savedEnrolledCourses) : [];
    } catch (error) {
      console.error("Failed to parse enrolledCourses from localStorage:", error);
      return [];
    }
  });

  const [registeredLiveClasses, setRegisteredLiveClasses] = useState(() => {
    try {
      const savedLiveClasses = localStorage.getItem('registeredLiveClasses');
      return savedLiveClasses ? JSON.parse(savedLiveClasses) : [];
    } catch (error) {
      console.error("Failed to parse registered live classes from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);
  
  useEffect(() => {
    localStorage.setItem('registeredLiveClasses', JSON.stringify(registeredLiveClasses));
  }, [registeredLiveClasses]);

  const handleAddToCart = (course) => {
    setCart(prevCart => {
      const isItemInCart = prevCart.find(item => item.id === course.id);
      if (!isItemInCart) {
        return [...prevCart, { ...course, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const handleRemoveFromCart = (courseId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== courseId));
  };
  
  const handleAddToWishlist = (course) => {
    setWishlist(prevWishlist => {
      const isItemInWishlist = prevWishlist.find(item => item.id === course.id);
      if (!isItemInWishlist) {
        return [...prevWishlist, course];
      }
      return prevWishlist;
    });
  };

  const handleRemoveFromWishlist = (courseId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== courseId));
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleBuyCourse = (courseId) => {
    const courseToEnroll = cart.find(item => item.id === courseId);
    if (courseToEnroll) {
      setEnrolledCourses(prevEnrolled => [...prevEnrolled, courseToEnroll]);
      setCart(prevCart => prevCart.filter(item => item.id !== courseId));
    }
  };

  const handleCheckout = () => {
    const newEnrolledCourses = cart.filter(course => !enrolledCourses.some(enrolled => enrolled.id === course.id));
    setEnrolledCourses(prevEnrolled => [...prevEnrolled, ...newEnrolledCourses]);
    setCart([]);
  };

  const handleRegisterLiveClass = (event) => {
    const isAlreadyRegistered = registeredLiveClasses.some(cls => cls.id === event.id);
    if (!isAlreadyRegistered) {
      setRegisteredLiveClasses(prevClasses => [...prevClasses, event]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/blog/:id" element={<BlogPage isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        
        <Route path="/search" element={<SearchPage coursesData={coursesData} isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />

        <Route path="/all-stacks/free-stacks" element={<FreeStacks isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/product-strategy" element={<ProductStrategy isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/ux-ui-design" element={<UxUiDesign isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/engineering-development" element={<EngineeringDevelopment isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/data-analytics" element={<DataAnalytics isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/cybersecurity-compliance" element={<CybersecurityCompliance isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/ai-automation" element={<AiAutomation isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/all-stacks/marketing" element={<Marketing isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />

        <Route path="/for-business/Brave-business" element={<BraveBusiness isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/for-business/partner-with-us" element={<PartnerWithUs isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/for-business/hire-from-us" element={<HireFromUs isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />

        <Route path="/resources/free-resources" element={<FreeResources isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/resources/success-stories" element={<SuccessStories isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/resources/masterclass-replays" element={<MasterclassReplays isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/resources/Brave-statistics" element={<BraveStatistics isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/resources/community-events" element={<CommunityEvents isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        
        <Route path="/more/about-us" element={<AboutUs isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/more/become-a-mentor" element={<BecomeAMentor isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/more/join-Brave-teams" element={<JoinBraveTeams isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/more/join-Brave-projects" element={<JoinBraveProjects isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/more/plans" element={<Plans isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/more/live-classes" element={<LiveClasses isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} onRegisterLiveClass={handleRegisterLiveClass} registeredLiveClasses={registeredLiveClasses} />} />
        
        <Route 
          path="/course-details/:courseId" 
          element={<CourseDetailsTemplate 
            onAddToCart={handleAddToCart} 
            onAddToWishlist={handleAddToWishlist} 
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onRemoveFromCart={handleRemoveFromCart}
            cart={cart} 
            wishlist={wishlist} 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout}
            cartItemsCount={cart.length}
            enrolledCourses={enrolledCourses}
          />} 
        />

        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />

        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} registeredLiveClassesCount={registeredLiveClasses.length} enrolledCourses={enrolledCourses} />} />
        <Route path="/dashboard/my-profile" element={<MyProfile isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route 
          path="/dashboard/enrolled-courses" 
          element={<EnrolledCourses 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            cartItemsCount={cart.length}
            enrolledCourses={enrolledCourses} 
          />} 
        />
        <Route 
          path="/dashboard/wishlist" 
          element={<Wishlist 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout}
            wishlistItems={wishlist} 
            onRemoveFromWishlist={handleRemoveFromWishlist} 
            onAddToCart={handleAddToCart}
            cartItemsCount={cart.length}
          />} 
        />
        <Route path="/dashboard/order-history" element={<OrderHistory isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/dashboard/settings" element={<Settings isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} />} />
        <Route path="/dashboard/my-live-classes" element={<MyLiveClasses isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} registeredLiveClasses={registeredLiveClasses} />} />
        <Route path="/dashboard/live-class/:classId" element={<LiveClassRecordings isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} liveClassesData={liveClassesData} />} />

        <Route 
          path="/course/:courseId" 
          element={<CoursePage 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            cartItemsCount={cart.length} 
            enrolledCourses={enrolledCourses} 
            setEnrolledCourses={setEnrolledCourses} 
          />} 
        />

        <Route 
          path="/cart" 
          element={<CartPage 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout}
            cartItems={cart} 
            onRemoveFromCart={handleRemoveFromCart}
            cartItemsCount={cart.length}
            onCheckout={handleCheckout}
          />} 
        />
      </Routes>
    </Router>
  );
}