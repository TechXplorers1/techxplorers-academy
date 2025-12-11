import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, set } from "firebase/database";
import { auth, db } from './firebase';

// 1. Create the Context
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // User-specific Academy State (Profile/Progress)
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [registeredLiveClasses, setRegisteredLiveClasses] = useState([]);

    useEffect(() => {
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

                        // Parse Enrolled Courses
                        const enrolledCoursesObject = data.enrolledCourses || {};
                        setEnrolledCourses(Object.keys(enrolledCoursesObject).map(id => ({
                            id,
                            progress: enrolledCoursesObject[id].progress || 0,
                            completedLessons: enrolledCoursesObject[id].completedLessons || {}
                        })));

                        // Parse Registered Live Classes
                        setRegisteredLiveClasses(Object.keys(data.registeredLiveClasses || {}));

                    } else if (auth.currentUser) {
                        // User creation logic for new Firebase users should ideally handle this, 
                        // but keeping fallback here as in original code
                        set(userRef, {
                            email: auth.currentUser.email,
                            firstName: '',
                            lastName: '',
                            role: 'user',
                            cart: {},
                            wishlist: {},
                            enrolledCourses: {},
                            registeredLiveClasses: {},
                            orderHistory: {}
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
        isLoggedIn,
        setIsLoggedIn,
        onLogout: handleLogout,
        user,
        userRole,
        firstName,
        lastName,
        enrolledCourses,
        setEnrolledCourses,
        registeredLiveClasses,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
