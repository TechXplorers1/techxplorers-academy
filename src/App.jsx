import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ref, set, update } from "firebase/database";
import { db, auth } from './firebase';
import { AuthProvider, useAuth } from './AuthContext'; // Import Context

// Page imports (kept for route definitions)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
// NEW: Import ForgotPasswordPage
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'; 
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/dashboard/MyProfile';
import EnrolledCourses from './pages/dashboard/EnrolledCourses';
import { Wishlist } from './pages/dashboard/Wishlist';
import OrderHistory from './pages/dashboard/OrderHistory';
import Settings from './pages/dashboard/Settings';
import MyLiveClasses from './pages/dashboard/MyLiveClasses';
import LiveClassRecordings from './pages/dashboard/LiveClassRecordings';
import CoursePage from './pages/dashboard/CoursePage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import BlogPage from './pages/BlogPage';
import CategoryPage from './pages/all-stacks/CategoryPage';
import BraveBusiness from './pages/for-business/BraveBusiness';
import HireFromUs from './pages/for-business/HireFromUs';
import PartnerWithUs from './pages/for-business/PartnerWithUs';
import BraveStatistics from './pages/resources/BraveStatistics';
import CommunityEvents from './pages/resources/CommunityEvents';
import FreeResources from './pages/resources/FreeResources';
import MasterclassReplays from './pages/resources/MasterclassReplays';
import SuccessStories from './pages/resources/SuccessStories';
import AboutUs from './pages/more/AboutUs';
import BecomeAMentor from './pages/more/BecomeAMentor';
import JoinBraveProjects from './pages/more/JoinBraveProjects';
import JoinBraveTeams from './pages/more/JoinBraveTeams';
import Plans from './pages/more/Plans';
import LiveClasses from './pages/more/LiveClasses';
import CourseDetailsTemplate from './pages/course-details/CourseDetailsTemplate';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import BlogManagement from './pages/admin/BlogManagement';
import LiveClassManagement from './pages/admin/LiveClassManagement';
import InstructorManagement from './pages/admin/InstructorManagement';
import OrderManagement from './pages/admin/OrderManagement';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import CouponManagement from './pages/admin/CouponManagement';
import EditCourseDetails from './pages/admin/EditCourseDetails';

// Instructor pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';

const AdminRoute = ({ children }) => {
  const { userRole } = useAuth();
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

const InstructorRoute = ({ children }) => {
    const { userRole } = useAuth();
    if (userRole !== 'instructor') {
      return <Navigate to="/" replace />;
    }
    return children;
};

// Component to house the main application logic and routes
const AppRoutes = () => {
    // Destructure ALL needed state and data from the context
    const { 
        user, userRole, cart, wishlist, enrolledCourses, 
        registeredLiveClasses, liveClassesData, coursesData, 
        blogPostsData, instructorApplications, firstName, lastName,
        setIsLoggedIn, setEnrolledCourses, isLoggedIn, onLogout, cartItemsCount,
        allCoursesFlatList, allCoursesFullObject // ALL course data formats
    } = useAuth();

    // --- HELPER FUNCTIONS (Kept here as they involve database writes) ---
    
    // Note: handleUpdateUserInDB logic removed as it wasn't used in routes, 
    // but the rest of the handlers are kept to pass as props.
    
    const handleAddToCart = (course) => {
        if (!user) return;
        const userCartRef = ref(db, `users/${user.uid}/cart/${course.id}`);
        set(userCartRef, course);
    };

    const handleRemoveFromCart = (courseId) => {
        if (!user) return;
        const userCartRef = ref(db, `users/${user.uid}/cart/${courseId}`);
        set(userCartRef, null);
    };

    const handleAddToWishlist = (course) => {
        if (!user) return;
        const userWishlistRef = ref(db, `users/${user.uid}/wishlist/${course.id}`);
        set(userWishlistRef, course);
    };

    const handleRemoveFromWishlist = (courseId) => {
        if (!user) return;
        const userWishlistRef = ref(db, `users/${user.uid}/wishlist/${courseId}`);
        set(userWishlistRef, null);
    };

    const handleCheckout = () => {
        if (!user) return;
        const userRef = ref(db, `users/${user.uid}`);
        const newEnrolledCoursesObject = cart.reduce((obj, item) => ({
          ...obj,
          [item.id]: { progress: 0, completedLessons: {} }
        }), {});
        update(userRef, {
          enrolledCourses: { ...enrolledCourses.reduce((o, c) => ({ ...o, [c.id]: c }), {}), ...newEnrolledCoursesObject },
          cart: {}
        });
    };

    const handleRegisterLiveClass = (event) => {
        if (!user) return;
        const userLiveClassRef = ref(db, `users/${user.uid}/registeredLiveClasses/${event.id}`);
        set(userLiveClassRef, true);
    };

    const userProfile = {
        uid: user?.uid,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        email: user?.email,
    };
  
    // Common props object is no longer used, we pass props explicitly or rely on context where appropriate.
    // However, for consistency with the original code structure (passing a commonProps object),
    // let's define a minimal one that can be spread:
    const commonProps = {
        isLoggedIn,
        onLogout,
        cartItemsCount,
        coursesData, // Grouped data
        userRole,
        user: userProfile,
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage {...commonProps} blogPostsData={blogPostsData} />} />
                <Route path="/login" element={<LoginPage {...commonProps} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignupPage {...commonProps} setIsLoggedIn={setIsLoggedIn} />} />
                {/* NEW: Forgot Password Route */}
                <Route path="/forgot-password" element={<ForgotPasswordPage {...commonProps} />} />
                <Route path="/more/become-a-mentor" element={<BecomeAMentor {...commonProps} />} />

                <Route path="/blog/:id" element={<BlogPage {...commonProps} blogPostsData={blogPostsData} />} />
                <Route path="/search" element={<SearchPage {...commonProps} coursesData={allCoursesFlatList} coursesDataForHeader={coursesData} />} />
                <Route path="/all-stacks/:categoryKey" element={<CategoryPage {...commonProps} />} />
                <Route path="/course-details/:courseId" element={<CourseDetailsTemplate {...commonProps} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onRemoveFromWishlist={handleRemoveFromWishlist} onRemoveFromCart={handleRemoveFromCart} cart={cart} wishlist={wishlist} enrolledCourses={enrolledCourses} coursesData={allCoursesFullObject} />} />
                <Route path="/cart" element={<CartPage {...commonProps} cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} />} />
        
                <Route path="/for-business/Brave-business" element={<BraveBusiness {...commonProps} />} />
                <Route path="/for-business/partner-with-us" element={<PartnerWithUs {...commonProps} />} />
                <Route path="/for-business/hire-from-us" element={<HireFromUs {...commonProps} />} />
                <Route path="/resources/free-resources" element={<FreeResources {...commonProps} />} />
                <Route path="/resources/success-stories" element={<SuccessStories {...commonProps} />} />
                <Route path="/resources/masterclass-replays" element={<MasterclassReplays {...commonProps} />} />
                <Route path="/resources/Brave-statistics" element={<BraveStatistics {...commonProps} />} />
                <Route path="/resources/community-events" element={<CommunityEvents {...commonProps} />} />
                <Route path="/more/about-us" element={<AboutUs {...commonProps} />} />
                <Route path="/more/join-Brave-teams" element={<JoinBraveTeams {...commonProps} />} />
                <Route path="/more/join-Brave-projects" element={<JoinBraveProjects {...commonProps} />} />
                <Route path="/more/plans" element={<Plans {...commonProps} />} />
                <Route path="/more/live-classes" element={<LiveClasses {...commonProps} onRegisterLiveClass={handleRegisterLiveClass} registeredLiveClasses={registeredLiveClasses} liveClassesData={liveClassesData} />} />

                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={<Dashboard {...commonProps} enrolledCourses={enrolledCourses} registeredLiveClassesCount={registeredLiveClasses.length} />} />
                <Route path="/dashboard/my-profile" element={<MyProfile {...commonProps} />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses {...commonProps} enrolledCourses={enrolledCourses} coursesData={allCoursesFullObject} />} />
                <Route path="/dashboard/wishlist" element={<Wishlist {...commonProps} wishlistItems={wishlist} onRemoveFromWishlist={handleRemoveFromWishlist} onAddToCart={handleAddToCart} />} />
                <Route path="/dashboard/order-history" element={<OrderHistory {...commonProps} />} />
                <Route path="/dashboard/settings" element={<Settings {...commonProps} />} />
                <Route path="/dashboard/my-live-classes" element={<MyLiveClasses {...commonProps} registeredLiveClasses={registeredLiveClasses} liveClassesData={liveClassesData} />} />
                <Route path="/dashboard/live-class/:classId" element={<LiveClassRecordings {...commonProps} liveClassesData={liveClassesData} />} />
                <Route path="/course/:courseId" element={<CoursePage {...commonProps} enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses} coursesData={allCoursesFullObject} />} />
        
                {/* Instructor Dashboard Route */}
                <Route path="/instructor/dashboard" element={<InstructorRoute><InstructorDashboard {...commonProps} /></InstructorRoute>} />
        
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard {...commonProps} /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><UserManagement {...commonProps} /></AdminRoute>} />
                <Route path="/admin/instructors" element={<AdminRoute><InstructorManagement {...commonProps} applications={instructorApplications} /></AdminRoute>} />
                <Route path="/admin/courses" element={<AdminRoute><CourseManagement {...commonProps} /></AdminRoute>} />
                <Route path="/admin/courses/edit/:courseId" element={<AdminRoute><EditCourseDetails {...commonProps} /></AdminRoute>} />
                <Route path="/admin/blogs" element={<AdminRoute><BlogManagement {...commonProps} /></AdminRoute>} />
                <Route path="/admin/live-classes" element={<AdminRoute><LiveClassManagement {...commonProps} /></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><OrderManagement {...commonProps} /></AdminRoute>} />
                <Route path="/admin/coupons" element={<AdminRoute><CouponManagement {...commonProps} /></AdminRoute>} />
                <Route path="/admin/analytics" element={<AdminRoute><AnalyticsDashboard {...commonProps} /></AdminRoute>} />
        
            </Routes>
        </Router>
    );
};

// Main Export
export default function App() {
    return (
        // Wrap the entire app in the AuthProvider
        <AuthProvider> 
            <AppRoutes />
        </AuthProvider>
    );
}