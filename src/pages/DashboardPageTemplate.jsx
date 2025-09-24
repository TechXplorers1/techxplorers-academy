// DashboardPageTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import DashboardSidebar from '../components/DashboardSidebar';

const DashboardPageTemplate = ({ isLoggedIn, onLogout, cartItemsCount, title, children, user , coursesData }) => {
    // Generate initials dynamically from the user's name, handling cases where user or name is undefined.
    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
    };

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: title, path: "" }
    ];

    // Safely access user properties with a fallback
    const userName = user?.name || 'Guest';
    const userInitials = getInitials(userName);

    return (
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
                            {userInitials}
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Hello,</p>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{userName}</h2>
                        </div>
                    </div>
                    {title === "Dashboard" && (
                        <div className="md:ml-auto flex items-center justify-center space-x-2 text-blue-500 font-medium text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>Your Application is pending as of 12 September, 2025</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 mt-12 space-y-8">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
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