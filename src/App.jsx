import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set, update } from "firebase/database";
import { auth, db } from './firebase';
import { toCamelCase } from './utils/categoryHelper';

// Page imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
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

const AdminRoute = ({ userRole, children }) => {
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

const InstructorRoute = ({ userRole, children }) => {
    if (userRole !== 'instructor') {
      return <Navigate to="/" replace />;
    }
    return children;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [registeredLiveClasses, setRegisteredLiveClasses] = useState([]);
  const [coursesData, setCoursesData] = useState({});
  const [liveClassesData, setLiveClassesData] = useState([]);
  const [blogPostsData, setBlogPostsData] = useState([]);
  const [instructorApplications, setInstructorApplications] = useState([]);

  useEffect(() => {
    // --- Data fetching for courses, classes, applications, and blogs ---
    const coursesRef = ref(db, 'courses');
    const unsubscribeCourses = onValue(coursesRef, (snapshot) => {
        const data = snapshot.val() || {};
        const grouped = Object.values(data).reduce((acc, course) => {
            const key = toCamelCase(course.category);
            if (!acc[key]) acc[key] = [];
            acc[key].push(course);
            return acc;
        }, {});
        setCoursesData(grouped);
    });

    const liveClassesRef = ref(db, 'liveClasses');
    const unsubscribeLiveClasses = onValue(liveClassesRef, (snapshot) => {
        setLiveClassesData(Object.values(snapshot.val() || {}));
    });

    const blogPostsRef = ref(db, 'blogPosts');
    const unsubscribeBlogPosts = onValue(blogPostsRef, (snapshot) => {
        const data = snapshot.val() || [];
        setBlogPostsData(data.filter(post => post !== null));
    });

    const applicationsRef = ref(db, 'instructorApplications/');
    const unsubscribeApplications = onValue(applicationsRef, (snapshot) => {
        const data = snapshot.val();
        setInstructorApplications(data ? Object.values(data) : []);
    });
    
    // --- AUTH STATE LISTENER (CORRECTED LOGIC) ---
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      let unsubscribeDb = null;
      if (currentUser) {
        const userRef = ref(db, 'users/' + currentUser.uid);
        unsubscribeDb = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUser(currentUser);
            setIsLoggedIn(true);
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setUserRole(data.role || 'user');
            setCart(Object.values(data.cart || {}));
            setWishlist(Object.values(data.wishlist || {}));
            const enrolledCoursesObject = data.enrolledCourses || {};
            setEnrolledCourses(Object.keys(enrolledCoursesObject).map(id => ({
                id,
                progress: enrolledCoursesObject[id].progress || 0,
                completedLessons: enrolledCoursesObject[id].completedLessons || {}
            })));
            setRegisteredLiveClasses(Object.keys(data.registeredLiveClasses || {}));
          } else if (auth.currentUser) {
            set(userRef, {
              email: auth.currentUser.email,
              firstName: '',
              lastName: '',
              role: 'user',
              cart: {},
              wishlist: {},
              enrolledCourses: {},
              registeredLiveClasses: {}
            });
          }
        });
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setUserRole(null);
        setFirstName('');
        setLastName('');
        setCart([]);
        setWishlist([]);
        setEnrolledCourses([]);
        setRegisteredLiveClasses([]);
      }
      return () => {
          if (unsubscribeDb) {
              unsubscribeDb();
          }
      };
    });

    return () => {
      unsubscribeAuth();
      unsubscribeCourses();
      unsubscribeLiveClasses();
      unsubscribeBlogPosts();
      unsubscribeApplications();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  
  const handleUpdateUserInDB = (updates) => {
    if (!user) return;
    const userRef = ref(db, 'users/' + user.uid);
    update(userRef, updates).catch(error => console.error("Error updating user data: ", error));
  };

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
    setCart([]);
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
  
  const allCoursesFlatList = Object.values(coursesData).flat();
  const allCoursesFullObject = allCoursesFlatList.reduce((obj, course) => {
      obj[course.id] = course;
      return obj;
  }, {});

  const commonProps = {
    isLoggedIn,
    onLogout: handleLogout,
    cartItemsCount: cart.length,
    coursesData,
    userRole,
    user: userProfile,
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage {...commonProps} blogPostsData={blogPostsData} />} />
        <Route path="/login" element={<LoginPage {...commonProps} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage {...commonProps} setIsLoggedIn={setIsLoggedIn} />} />
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
        <Route path="/instructor/dashboard" element={<InstructorRoute userRole={userRole}><InstructorDashboard {...commonProps} /></InstructorRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute userRole={userRole}><AdminDashboard {...commonProps} /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute userRole={userRole}><UserManagement {...commonProps} /></AdminRoute>} />
        <Route path="/admin/instructors" element={<AdminRoute userRole={userRole}><InstructorManagement {...commonProps} applications={instructorApplications} /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute userRole={userRole}><CourseManagement {...commonProps} /></AdminRoute>} />
        <Route path="/admin/courses/edit/:courseId" element={<AdminRoute userRole={userRole}><EditCourseDetails {...commonProps} /></AdminRoute>} />
        <Route path="/admin/blogs" element={<AdminRoute userRole={userRole}><BlogManagement {...commonProps} /></AdminRoute>} />
        <Route path="/admin/live-classes" element={<AdminRoute userRole={userRole}><LiveClassManagement {...commonProps} /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute userRole={userRole}><OrderManagement {...commonProps} /></AdminRoute>} />
        <Route path="/admin/coupons" element={<AdminRoute userRole={userRole}><CouponManagement {...commonProps} /></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute userRole={userRole}><AnalyticsDashboard {...commonProps} /></AdminRoute>} />
        
      </Routes>
    </Router>
  );
}