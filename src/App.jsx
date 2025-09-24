import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set, update } from "firebase/database";
import { auth, db } from './firebase';
import { toCamelCase } from './utils/categoryHelper';

// Import the new dynamic category page
import CategoryPage from './pages/all-stacks/CategoryPage';

// Other page imports
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
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [registeredLiveClasses, setRegisteredLiveClasses] = useState([]);
  const [coursesData, setCoursesData] = useState({});
  const [liveClassesData, setLiveClassesData] = useState([]);
  const [blogPostsData, setBlogPostsData] = useState([]); // State for blog posts

  useEffect(() => {
    // Fetch Courses
    const coursesRef = ref(db, 'courses');
    const unsubscribeCourses = onValue(coursesRef, (snapshot) => {
      const flatCourses = snapshot.val() || {};
      
      const groupedCourses = Object.values(flatCourses).reduce((acc, course) => {
        if (course.category) {
          const key = toCamelCase(course.category);
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(course);
        }
        return acc;
      }, {});
      
      setCoursesData(groupedCourses);
    });

    // Fetch Live Classes
    const liveClassesRef = ref(db, 'liveClasses');
    const unsubscribeLiveClasses = onValue(liveClassesRef, (snapshot) => {
      setLiveClassesData(Object.values(snapshot.val() || {}));
    });

    // Fetch Blog Posts
    const blogPostsRef = ref(db, 'blogPosts');
    const unsubscribeBlogPosts = onValue(blogPostsRef, (snapshot) => {
        const data = snapshot.val() || [];
        // The first item is null in the DB, so we filter it out.
        const formattedData = data.filter(post => post !== null);
        setBlogPostsData(formattedData);
    });

    // Auth State Listener
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);

        const userRef = ref(db, 'users/' + currentUser.uid);
        const unsubscribeDb = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setCart(Object.values(data.cart || {}));
            setWishlist(Object.values(data.wishlist || {}));
            
            const enrolledCoursesObject = data.enrolledCourses || {};
            const enrolledCoursesArray = Object.keys(enrolledCoursesObject).map(id => ({
                id,
                progress: enrolledCoursesObject[id].progress || 0,
                completedLessons: enrolledCoursesObject[id].completedLessons || {}
            }));
            setEnrolledCourses(enrolledCoursesArray);

            setRegisteredLiveClasses(Object.keys(data.registeredLiveClasses || {}));
          } else {
            set(userRef, {
              email: currentUser.email,
              firstName: '',
              lastName: '',
              cart: {},
              wishlist: {},
              enrolledCourses: {},
              registeredLiveClasses: {}
            });
          }
        });

        return () => unsubscribeDb();
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setFirstName('');
        setLastName('');
        setCart([]);
        setWishlist([]);
        setEnrolledCourses([]);
        setRegisteredLiveClasses([]);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeCourses();
      unsubscribeLiveClasses();
      unsubscribeBlogPosts(); // Cleanup blog posts listener
    };
  }, []);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
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
    firstName: firstName,
    lastName: lastName,
    name: `${firstName} ${lastName}`.trim(),
    email: user ? user.email : '',
  };
  
  const allCoursesFlatList = Object.values(coursesData).flat();
  const allCoursesFullObject = allCoursesFlatList.reduce((obj, course) => {
      obj[course.id] = course;
      return obj;
  }, {});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} blogPostsData={blogPostsData} />} />
        <Route path="/blog/:id" element={<BlogPage isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} blogPostsData={blogPostsData} />} />

        <Route 
          path="/search" 
          element={<SearchPage 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            cartItemsCount={cart.length} 
            coursesData={allCoursesFlatList} 
            coursesDataForHeader={coursesData} 
          />} 
        />

        <Route 
          path="/all-stacks/:categoryKey" 
          element={<CategoryPage 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout} 
            cartItemsCount={cart.length} 
            coursesData={coursesData} 
          />} 
        />
        
        <Route path="/for-business/Brave-business" element={<BraveBusiness isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/for-business/partner-with-us" element={<PartnerWithUs isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/for-business/hire-from-us" element={<HireFromUs isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />

        <Route path="/resources/free-resources" element={<FreeResources isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/resources/success-stories" element={<SuccessStories isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/resources/masterclass-replays" element={<MasterclassReplays isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/resources/Brave-statistics" element={<BraveStatistics isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/resources/community-events" element={<CommunityEvents isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />

        <Route path="/more/about-us" element={<AboutUs isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/more/become-a-mentor" element={<BecomeAMentor isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/more/join-Brave-teams" element={<JoinBraveTeams isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/more/join-Brave-projects" element={<JoinBraveProjects isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/more/plans" element={<Plans isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/more/live-classes" element={<LiveClasses isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} onRegisterLiveClass={handleRegisterLiveClass} registeredLiveClasses={registeredLiveClasses} liveClassesData={liveClassesData} coursesData={coursesData} />} />

        <Route
          path="/course-details/:courseId"
          element={<CourseDetailsTemplate onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onRemoveFromWishlist={handleRemoveFromWishlist} onRemoveFromCart={handleRemoveFromCart} cart={cart} wishlist={wishlist} isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} enrolledCourses={enrolledCourses} coursesData={allCoursesFullObject} coursesDataForHeader={coursesData} />}
        />

        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} coursesData={coursesData} />} />

        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} registeredLiveClassesCount={registeredLiveClasses.length} enrolledCourses={enrolledCourses} user={userProfile} coursesData={coursesData} />} />
        <Route path="/dashboard/my-profile" element={<MyProfile isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} user={userProfile} coursesData={coursesData} />} />
        <Route
          path="/dashboard/enrolled-courses"
          element={<EnrolledCourses isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} enrolledCourses={enrolledCourses} coursesData={allCoursesFullObject} user={userProfile} coursesDataForHeader={coursesData} />}
        />
        <Route
          path="/dashboard/wishlist"
          element={<Wishlist isLoggedIn={isLoggedIn} onLogout={handleLogout} wishlistItems={wishlist} onRemoveFromWishlist={handleRemoveFromWishlist} onAddToCart={handleAddToCart} cartItemsCount={cart.length} user={userProfile} coursesData={coursesData} />}
        />
        <Route path="/dashboard/order-history" element={<OrderHistory isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} user={userProfile} coursesData={coursesData} />} />
        <Route path="/dashboard/settings" element={<Settings isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} user={userProfile} coursesData={coursesData} />} />
        <Route path="/dashboard/my-live-classes" element={<MyLiveClasses isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} registeredLiveClasses={registeredLiveClasses} liveClassesData={liveClassesData} user={userProfile} coursesData={coursesData} />} />
        <Route path="/dashboard/live-class/:classId" element={<LiveClassRecordings isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} liveClassesData={liveClassesData} user={userProfile} coursesData={coursesData} />} />
        
        <Route
          path="/course/:courseId"
          element={<CoursePage isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItemsCount={cart.length} enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses} coursesData={allCoursesFullObject} coursesDataForHeader={coursesData} />}
        />

        <Route
          path="/cart"
          element={<CartPage isLoggedIn={isLoggedIn} onLogout={handleLogout} cartItems={cart} onRemoveFromCart={handleRemoveFromCart} cartItemsCount={cart.length} onCheckout={handleCheckout} coursesData={coursesData} />}
        />
      </Routes>
    </Router>
  );
}