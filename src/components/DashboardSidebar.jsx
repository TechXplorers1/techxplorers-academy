// DashboardSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// ADDED: Import the new modal component
import ConfirmationModal from './ConfirmationModal'; 
import {
    FaUser,
    FaBook,
    FaHeart,
    FaHistory,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { MdDashboard, MdLiveTv } from 'react-icons/md';

const DashboardSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    // ADDED: State to control the logout modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    const { onLogout } = useAuth();

    const dashboardNavItems = [
        { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
        { name: 'My Profile', path: '/dashboard/my-profile', icon: FaUser },
        { name: 'Enrolled Courses', path: '/dashboard/enrolled-courses', icon: FaBook },
        { name: 'My Live Classes', path: '/dashboard/my-live-classes', icon: MdLiveTv },
        { name: 'Wishlist', path: '/dashboard/wishlist', icon: FaHeart },
        { name: 'Order History', path: '/dashboard/order-history', icon: FaHistory },
        { name: 'Settings', path: '/dashboard/settings', icon: FaCog },
    ];

    // MODIFIED: This just opens the modal
    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    // ADDED: This function is called by the modal's "Logout" button
    const handleConfirmLogout = () => {
        onLogout();
        setIsLogoutModalOpen(false); // Close the modal
        if (isOpen) {
            setIsOpen(false); // Also close the mobile sidebar if it's open
        }
    };

    return (
        // ADDED: relative positioning is needed for the modal z-index to work correctly
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit md:sticky md:top-8 relative">

            {/* --- Mobile Header (Hamburger) --- */}
            <div className="flex justify-between items-center md:hidden">
                <h3 className="text-lg font-bold">Dashboard Menu</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 hover:text-blue-600"
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* --- Desktop Header --- */}
            <h3 className="hidden md:block text-lg font-bold mb-4">Dashboard</h3>

            {/* --- Navigation List --- */}
            <ul className={`space-y-2 mt-4 md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block`}>
                {dashboardNavItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <li key={index}>
                            <Link to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>

                                <IconComponent className="h-5 w-5" />

                                <span className="font-medium">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}

                {/* --- Logout Button --- */}
                {/* MODIFIED: Now calls handleLogoutClick to open the modal */}
                <li>
                    <button
                        onClick={handleLogoutClick}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                        <FaSignOutAlt className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </li>
            </ul>

            {/* ADDED: Render the modal here. 
            */}
            <ConfirmationModal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
            />
        </div>
    );
};

export default DashboardSidebar;