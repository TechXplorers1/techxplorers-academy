import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminSidebar from '../../components/AdminSidebar';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon

const AdminDashboardTemplate = ({ isLoggedIn, onLogout, cartItemsCount, coursesData, userRole, title, children }) => {
    
    // 1. Add state to manage the mobile menu's open/closed status
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 2. Add a function to toggle the menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    return (
        <div className="min-h-screen bg-gray-100 font-inter flex flex-col">
            <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                cartItemsCount={cartItemsCount} 
                coursesData={coursesData}
                userRole={userRole} 
                // Note: You could also pass 'toggleMobileMenu' to your Header 
                // if you want the hamburger button to live up there.
            />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 3. Add the mobile-only hamburger button */}
                <button 
                    onClick={toggleMobileMenu} 
                    className="lg:hidden p-2 mb-4 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50"
                    aria-label="Open menu"
                >
                    <FaBars size={20} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* --- Sidebar Area --- */}
                    {/* 4. Removed the 'lg:sticky' wrapper div. The sidebar will handle its own positioning. */}
                    {/* 5. Pass the state and toggle function as props. */}
                    <AdminSidebar 
                        isOpen={isMobileMenuOpen}
                        toggleMenu={toggleMobileMenu}
                    />
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboardTemplate;