import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaUser,
    FaBook,
    FaHeart,
    FaHistory,
    FaCog,
    FaSignOutAlt
} from 'react-icons/fa';
import { MdDashboard, MdLiveTv } from 'react-icons/md';

const DashboardSidebar = () => {
    const location = useLocation();

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
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-8">
            <h3 className="text-lg font-bold mb-4">Dashboard</h3>
            <ul className="space-y-2">
                {dashboardNavItems.map((item, index) => {
                    const IconComponent = item.icon; // Get the component type
                    return (
                        <li key={index}>
                            <Link to={item.path}
                                // CHANGED: Active link colors to blue-based scheme
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>
                                
                                {/* Render the icon component with classes */}
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