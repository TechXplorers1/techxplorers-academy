import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set, update, push } from "firebase/database";
import { db } from '../firebase';
import { useAuth } from '../AuthContext';

const StoreContext = createContext();

export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
    const { user, userRole, setEnrolledCourses } = useAuth();

    // User-specific data
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    // Admin-specific data


    useEffect(() => {
        if (!user) {
            setCart([]);
            setWishlist([]);
            setOrderHistory([]);
            return;
        }

        const userRef = ref(db, 'users/' + user.uid);
        const unsubscribeUser = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCart(Object.values(data.cart || {}));
                setWishlist(Object.values(data.wishlist || {}));

                const userOrders = data.orderHistory || {};
                const ordersArray = Object.values(userOrders).sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrderHistory(ordersArray);
            }
        });

        return () => unsubscribeUser();
    }, [user]);



    // Actions
    const addToCart = (course) => {
        if (!user) return;
        const userCartRef = ref(db, `users/${user.uid}/cart/${course.id}`);
        set(userCartRef, course);
    };

    const removeFromCart = (courseId) => {
        if (!user) return;
        const userCartRef = ref(db, `users/${user.uid}/cart/${courseId}`);
        set(userCartRef, null);
    };

    const addToWishlist = (course) => {
        if (!user) return;
        const userWishlistRef = ref(db, `users/${user.uid}/wishlist/${course.id}`);
        set(userWishlistRef, course);
    };

    const removeFromWishlist = (courseId) => {
        if (!user) return;
        const userWishlistRef = ref(db, `users/${user.uid}/wishlist/${courseId}`);
        set(userWishlistRef, null);
    };

    // Checkout Logic
    const checkout = async (cartItems, enrolledCourses) => {
        if (!user || cartItems.length === 0) return;

        const userRef = ref(db, `users/${user.uid}`);

        const newEnrolledCoursesObject = cartItems.reduce((obj, item) => ({
            ...obj,
            [item.id]: { progress: 0, completedLessons: {} }
        }), {});

        const orderData = {
            id: 'ORD-' + Date.now().toString().slice(-8),
            date: new Date().toISOString(),
            total: cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2),
            status: 'Completed',
            courses: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price || 0
            })),
            userId: user.uid,
            userEmail: user.email,
        };

        // User History
        const userOrderHistoryRef = push(ref(db, `users/${user.uid}/orderHistory`));
        await set(userOrderHistoryRef, orderData);

        // Global Orders
        const globalOrderRef = push(ref(db, `orders`));
        await set(globalOrderRef, orderData);

        // Update Enrollment
        // Note: We need the CURRENT enrolled courses to merge.
        // We can pass it in or fetch it. Since we have setEnrolledCourses in AuthContext, 
        // we might not have the *latest* state in variable if we don't rely on the argument.
        // But `enrolledCourses` is passed as argument here for safety.

        const existingEnrolled = enrolledCourses.reduce((o, c) => ({ ...o, [c.id]: { progress: c.progress, completedLessons: c.completedLessons } }), {});

        await update(userRef, {
            enrolledCourses: { ...existingEnrolled, ...newEnrolledCoursesObject },
            cart: {}
        });

        // The listeners will update the local state
        return true;
    };

    // Live Class Registration
    const registerLiveClass = (event) => {
        if (!user) return;
        const userLiveClassRef = ref(db, `users/${user.uid}/registeredLiveClasses/${event.id}`);
        set(userLiveClassRef, true);
    };

    const value = {
        cart,
        wishlist,
        orderHistory,

        cartItemsCount: cart.length,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        checkout,
        registerLiveClass
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};
