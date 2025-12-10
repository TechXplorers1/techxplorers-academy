import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ref, set, update, push } from "firebase/database"; 
import { db, auth } from './firebase';
import { AuthProvider, useAuth } from './AuthContext';

// Page imports (kept for route definitions)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
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
import TXBusiness from './pages/for-business/TXBusiness';
import HireFromUs from './pages/for-business/HireFromUs';
import PartnerWithUs from './pages/for-business/PartnerWithUs';
import TXStatistics from './pages/resources/TXStatistics';
import CommunityEvents from './pages/resources/CommunityEvents';
import FreeResources from './pages/resources/FreeResources';
import MasterclassReplays from './pages/resources/MasterclassReplays';
import SuccessStories from './pages/resources/SuccessStories';
import AboutUs from './pages/more/AboutUs';
import BecomeAMentor from './pages/more/BecomeAMentor';
import JoinTXProjects from './pages/more/JoinTXProjects';
import JoinTXTeams from './pages/more/JoinTXTeams';
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
import SuccessStoriesManagement from './pages/admin/SuccessStoriesManagement';
import CommunityEventsManagement from './pages/admin/CommunityEventsManagement'; 

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
        user, userRole, cart, wishlist, enrolledCourses, orderHistory, 
        registeredLiveClasses, liveClassesData, coursesData, 
        blogPostsData, instructorApplications, firstName, lastName,
        setIsLoggedIn, setEnrolledCourses, isLoggedIn, onLogout, cartItemsCount,
        allCoursesFlatList, allCoursesFullObject,
        successStoriesData,
        communityEventsData, // NEW: Destructure communityEventsData
    } = useAuth();

    // --- HELPER FUNCTIONS (Kept here as they involve database writes) ---
    
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

    // MODIFIED: Handle Checkout (Simulated Purchase)
    const handleCheckout = async () => {
        if (!user || cart.length === 0) return;
        
        const userRef = ref(db, `users/${user.uid}`);
        
        // 1. Prepare new enrolled courses object
        const newEnrolledCoursesObject = cart.reduce((obj, item) => ({
          ...obj,
          [item.id]: { progress: 0, completedLessons: {} }
        }), {});
        
        // 2. Create the order object
        const orderData = {
            id: 'ORD-' + Date.now().toString().slice(-8), // Simple unique ID
            date: new Date().toISOString(),
            total: cart.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2),
            status: 'Completed',
            courses: cart.map(item => ({ 
                id: item.id, 
                title: item.title, 
                price: item.price || 0 
            })),
            userId: user.uid,
            userEmail: user.email,
        };

        // 3. Save to User's Order History
        const userOrderHistoryRef = push(ref(db, `users/${user.uid}/orderHistory`)); // Use push() for a unique key
        await set(userOrderHistoryRef, orderData);

        // 4. Save a copy to Global Orders (for Admin access)
        const globalOrderRef = push(ref(db, `orders`)); // Global orders table
        await set(globalOrderRef, orderData);


        // 5. Update user enrollment and clear cart
        const existingEnrolled = enrolledCourses.reduce((o, c) => ({ ...o, [c.id]: { progress: c.progress, completedLessons: c.completedLessons } }), {});

        await update(userRef, {
          enrolledCourses: { ...existingEnrolled, ...newEnrolledCoursesObject },
          cart: {} // Clear the cart
        });

        // The AuthContext listener will automatically update the local state (cart, enrolledCourses, orderHistory)
        return true; // Indicate success for CartPage to handle UI
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
                {/* MODIFIED: Pass successStoriesData to LandingPage */}
                <Route path="/" element={<LandingPage {...commonProps} blogPostsData={blogPostsData} successStoriesData={successStoriesData} />} />
                <Route path="/login" element={<LoginPage {...commonProps} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignupPage {...commonProps} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage {...commonProps} />} />
                <Route path="/more/become-a-mentor" element={<BecomeAMentor {...commonProps} />} />

                <Route path="/blog/:id" element={<BlogPage {...commonProps} blogPostsData={blogPostsData} />} />
                <Route path="/search" element={<SearchPage {...commonProps} coursesData={allCoursesFlatList} coursesDataForHeader={coursesData} />} />
                <Route path="/all-stacks/:categoryKey" element={<CategoryPage {...commonProps} />} />
                <Route path="/course-details/:courseId" element={<CourseDetailsTemplate {...commonProps} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onRemoveFromWishlist={handleRemoveFromWishlist} onRemoveFromCart={handleRemoveFromCart} cart={cart} wishlist={wishlist} enrolledCourses={enrolledCourses} coursesData={allCoursesFullObject} />} />
                <Route path="/cart" element={<CartPage {...commonProps} cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} />} />
        
                <Route path="/for-business/TX-business" element={<TXBusiness {...commonProps} />} />
                <Route path="/for-business/partner-with-us" element={<PartnerWithUs {...commonProps} />} />
                <Route path="/for-business/hire-from-us" element={<HireFromUs {...commonProps} />} />
                <Route path="/resources/free-resources" element={<FreeResources {...commonProps} />} />
                {/* MODIFIED: Pass successStoriesData as 'stories' prop */}
                <Route path="/resources/success-stories" element={<SuccessStories {...commonProps} stories={successStoriesData} />} /> 
                <Route path="/resources/masterclass-replays" element={<MasterclassReplays {...commonProps} />} />
                <Route path="/resources/TX-statistics" element={<TXStatistics {...commonProps} />} />
                {/* MODIFIED: Pass communityEventsData as 'events' prop */}
                <Route path="/resources/community-events" element={<CommunityEvents {...commonProps} events={communityEventsData} />} />
                <Route path="/more/about-us" element={<AboutUs {...commonProps} />} />
                <Route path="/more/join-TX-teams" element={<JoinTXTeams {...commonProps} />} />
                <Route path="/more/join-TX-projects" element={<JoinTXProjects {...commonProps} />} />
                <Route path="/more/plans" element={<Plans {...commonProps} />} />
                <Route path="/more/live-classes" element={<LiveClasses {...commonProps} onRegisterLiveClass={handleRegisterLiveClass} registeredLiveClasses={registeredLiveClasses} liveClassesData={liveClassesData} />} />

                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={<Dashboard {...commonProps} enrolledCourses={enrolledCourses} registeredLiveClassesCount={registeredLiveClasses.length} />} />
                <Route path="/dashboard/my-profile" element={<MyProfile {...commonProps} />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses {...commonProps} enrolledCourses={enrolledCourses} coursesData={allCoursesFullObject} />} />
                <Route path="/dashboard/wishlist" element={<Wishlist {...commonProps} wishlistItems={wishlist} onRemoveFromWishlist={handleRemoveFromWishlist} onAddToCart={handleAddToCart} />} />
                {/* MODIFIED: Pass orderHistory to OrderHistory page */}
                <Route path="/dashboard/order-history" element={<OrderHistory {...commonProps} orderHistory={orderHistory} />} />
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
                {/* OrderManagement component will fetch its own data */}
                <Route path="/admin/orders" element={<AdminRoute><OrderManagement {...commonProps} /></AdminRoute>} />
                 {/* NEW ADMIN ROUTE: Pass stories prop */}
                <Route path="/admin/success-stories" element={<AdminRoute><SuccessStoriesManagement {...commonProps} stories={successStoriesData} /></AdminRoute>} />
                {/* NEW ADMIN ROUTE: Pass events prop */}
                <Route path="/admin/community-events" element={<AdminRoute><CommunityEventsManagement {...commonProps} events={communityEventsData} /></AdminRoute>} />
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