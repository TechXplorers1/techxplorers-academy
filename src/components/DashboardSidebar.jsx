// DashboardSidebar.jsx
import React, { useState } from 'react'; // MODIFIED: Added useState
import { Link, useLocation } from 'react-router-dom';
import {
    FaUser,
    FaBook,
    FaHeart,
    FaHistory,
    FaCog,
    FaSignOutAlt,
    FaBars, // ADDED: Icon for hamburger
    FaTimes // ADDED: Icon for close
} from 'react-icons/fa';
import { MdDashboard, MdLiveTv } from 'react-icons/md';

const DashboardSidebar = () => {
    const location = useLocation();
    // ADDED: State to manage mobile menu toggle
    const [isOpen, setIsOpen] = useState(false);

    const dashboardNavItems = [
        { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
        { name: 'My Profile', path: '/dashboard/my-profile', icon: FaUser },
        { name: 'Enrolled Courses', path: '/dashboard/enrolled-courses', icon: FaBook },
        { name: 'My Live Classes', path: '/dashboard/my-live-classes', icon: MdLiveTv },
        { name: 'Wishlist', path: '/dashboard/wishlist', icon: FaHeart },
        { name: 'Order History', path: '/dashboard/order-history', icon: FaHistory },
        { name: 'Settings', path: '/dashboard/settings', icon: FaCog },
        { name: 'Logout', path: '/', icon: FaSignOutAlt },
    ];

    return (
        // MODIFIED: Changed 'sticky' to 'md:sticky' to prevent overlapping on mobile
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit md:sticky md:top-8">
            
            {/* --- Mobile Header (Hamburger) --- */}
            {/* ADDED: This header is only visible on mobile (md:hidden) */}
            <div className="flex justify-between items-center md:hidden">
                <h3 className="text-lg font-bold">Dashboard Menu</h3>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-gray-700 hover:text-blue-600"
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                >
                    {/* Toggles between hamburger and close icons */}
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* --- Desktop Header --- */}
            {/* MODIFIED: This header is hidden on mobile */}
            <h3 className="hidden md:block text-lg font-bold mb-4">Dashboard</h3>
            
            {/* --- Navigation List --- */}
            {/* MODIFIED: Conditionally applies 'hidden' or 'block' based on 'isOpen' state on mobile */}
            <ul className={`space-y-2 mt-4 md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block`}>
                {dashboardNavItems.map((item, index) => {
                    const IconComponent = item.icon; // Get the component type
                    return (
                        <li key={index}>
                            <Link to={item.path}
                                // Active link colors
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>
                                
                                <IconComponent className="h-5 w-5" />
                                
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DashboardSidebar;