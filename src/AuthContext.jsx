import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set } from "firebase/database";
import { auth, db } from './firebase';
import { toCamelCase } from './utils/categoryHelper';

// 1. Create the Context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // State migrated from App.jsx
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
    
    // NEW: State for the calculated course structures
    const [allCoursesFlatList, setAllCoursesFlatList] = useState([]);
    const [allCoursesFullObject, setAllCoursesFullObject] = useState({});

    useEffect(() => {
        // --- Data fetching for courses, classes, applications, and blogs ---
        const coursesRef = ref(db, 'courses');
        const unsubscribeCourses = onValue(coursesRef, (snapshot) => {
            const data = snapshot.val() || {};
            const allCourses = Object.values(data);

            // 1. Grouped Courses Data (for Header, CategoryPage)
            const grouped = allCourses.reduce((acc, course) => {
                const key = toCamelCase(course.category);
                if (!acc[key]) acc[key] = [];
                acc[key].push(course);
                return acc;
            }, {});
            setCoursesData(grouped);
            
            // 2. Flat List (for SearchPage)
            setAllCoursesFlatList(allCourses);
            
            // 3. Flat Object Map (for CourseDetailsTemplate, EnrolledCourses, CoursePage)
            const fullObject = allCourses.reduce((obj, course) => {
                obj[course.id] = course;
                return obj;
            }, {});
            setAllCoursesFullObject(fullObject);
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
        
        // --- AUTH STATE LISTENER ---
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
                        // User creation logic for new Firebase users
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
                // Clear state on logout
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

    // Combine all values for the context
    const contextValue = {
        // Common App State and Handlers
        isLoggedIn,
        onLogout: handleLogout,
        cartItemsCount: cart.length,
        userRole,
        user,
        firstName,
        lastName,
        cart,
        wishlist,
        enrolledCourses,
        registeredLiveClasses,
        liveClassesData,
        blogPostsData,
        instructorApplications,

        // ALL THREE COURSE DATA STRUCTURES
        coursesData,            // Grouped (for Category & Header)
        allCoursesFlatList,     // Flat Array (for SearchPage)
        allCoursesFullObject,   // Flat Object Map (for details/enrolled pages)

        // Setters
        setIsLoggedIn, 
        setEnrolledCourses,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};