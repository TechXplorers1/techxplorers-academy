import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
        
        {/* All Stacks Routes */}
        <Route path="/all-stacks/free-stacks" element={<FreeStacks isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/product-strategy" element={<ProductStrategy isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/ux-ui-design" element={<UxUiDesign isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/engineering-development" element={<EngineeringDevelopment isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/data-analytics" element={<DataAnalytics isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/cybersecurity-compliance" element={<CybersecurityCompliance isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/ai-automation" element={<AiAutomation isLoggedIn={isLoggedIn} />} />
        <Route path="/all-stacks/marketing" element={<Marketing isLoggedIn={isLoggedIn} />} />

        {/* For Business Routes */}
        <Route path="/for-business/brave-business" element={<BraveBusiness isLoggedIn={isLoggedIn} />} />
        <Route path="/for-business/partner-with-us" element={<PartnerWithUs isLoggedIn={isLoggedIn} />} />
        <Route path="/for-business/hire-from-us" element={<HireFromUs isLoggedIn={isLoggedIn} />} />

        {/* Resources Routes */}
        <Route path="/resources/free-resources" element={<FreeResources isLoggedIn={isLoggedIn} />} />
        <Route path="/resources/success-stories" element={<SuccessStories isLoggedIn={isLoggedIn} />} />
        <Route path="/resources/masterclass-replays" element={<MasterclassReplays isLoggedIn={isLoggedIn} />} />
        <Route path="/resources/brave-statistics" element={<BraveStatistics isLoggedIn={isLoggedIn} />} />
        <Route path="/resources/community-events" element={<CommunityEvents isLoggedIn={isLoggedIn} />} />
        
        {/* More Routes */}
        <Route path="/more/about-us" element={<AboutUs isLoggedIn={isLoggedIn} />} />
        <Route path="/more/become-a-mentor" element={<BecomeAMentor isLoggedIn={isLoggedIn} />} />
        <Route path="/more/join-brave-teams" element={<JoinBraveTeams isLoggedIn={isLoggedIn} />} />
        <Route path="/more/join-brave-projects" element={<JoinBraveProjects isLoggedIn={isLoggedIn} />} />
        <Route path="/more/plans" element={<Plans isLoggedIn={isLoggedIn} />} />
        
        {/* Course Details Route */}
        <Route path="/course/:courseId" element={<CourseDetailsTemplate isLoggedIn={isLoggedIn} />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/my-profile" element={<MyProfile isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/wishlist" element={<Wishlist isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/order-history" element={<OrderHistory isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/settings" element={<Settings isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}