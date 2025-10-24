// DashboardPageTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import DashboardSidebar from '../components/DashboardSidebar';

const DashboardPageTemplate = ({ isLoggedIn, onLogout, cartItemsCount, title, children, user , coursesData }) => {
    // MODIFIED: Generate initials dynamically, using firstName and lastName safely.
    const getInitials = (user) => {
        if (!user) return '';
        
        // Use user.firstName and user.lastName (passed via props from useAuth/App.jsx)
        const first = (user.firstName && user.firstName[0]) || '';
        const last = (user.lastName && user.lastName[0]) || '';

        // Safely combine them, defaulting to 'G' for Guest if everything is missing.
        const initials = (first + last).trim().toUpperCase();
        return initials || 'U'; // Return 'U' for Unknown or ensure a fallback like 'G' is used if user data is genuinely missing from AuthContext.
    };

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: title, path: "" }
    ];

    // Safely access user properties with a fallback
    // Note: user.name is composed in App.jsx as `${firstName} ${lastName}`.trim()
    const userName = user?.name || 'Guest'; 
    const userInitials = getInitials(user); // Pass the user object

    return (
        // CHANGED: Main background to light gray, text to dark gray
        <div className="min-h-screen bg-gray-50 font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} />
            <Hero
                title={title}
                breadcrumbs={breadcrumbs}
            />

            {/* Floating Profile Card */}
            <div className="container mx-auto px-4 md:px-8 -mt-16 relative z-20">
                <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 transform transition-transform duration-300 hover:scale-[1.01]">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-700">
                            {/* FIX: This now uses initials generated from safe properties */}
                            {userInitials} 
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Hello,</p>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{userName}</h2>
                        </div>
                    </div>
                    {/* REMOVED: Conditional rendering for "Your Application is pending..." */}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 mt-12 space-y-8">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* DashboardSidebar component needs to be updated separately if it exists */}
                    <DashboardSidebar />

                    <div className="md:col-span-3 space-y-8">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPageTemplate;