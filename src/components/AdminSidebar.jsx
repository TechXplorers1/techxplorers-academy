import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaUsers,
    FaBook,
    FaChalkboardTeacher,
    FaPencilAlt,
    FaFileInvoiceDollar,
    FaTrophy,
    FaCalendarAlt,
    FaTags
} from 'react-icons/fa';
import { MdDashboard, MdLiveTv } from 'react-icons/md';

const AdminSidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
        // { name: 'Analytics', path: '/admin/analytics', icon: FaChartBar }, // Example
        { name: 'User Management', path: '/admin/users', icon: FaUsers },
        { name: 'Course Management', path: '/admin/courses', icon: FaBook },
        { name: 'Live Class Management', path: '/admin/live-classes', icon: MdLiveTv },
        { name: 'Instructor Management', path: '/admin/instructors', icon: FaChalkboardTeacher },
        { name: 'Blog Management', path: '/admin/blogs', icon: FaPencilAlt },
        { name: 'Order Management', path: '/admin/orders', icon: FaFileInvoiceDollar },
        { name: 'Success Stories', path: '/admin/success-stories', icon: FaTrophy },
        { name: 'Community Events', path: '/admin/community-events', icon: FaCalendarAlt }, // NEW
        { name: 'Coupon Management', path: '/admin/coupons', icon: FaTags },
    ];

    // CHANGED: Active/Inactive link classes to use blue accents
    const activeLinkClass = "bg-blue-600 text-white";
    const inactiveLinkClass = "text-gray-700 hover:bg-blue-50 hover:text-blue-700";

    return (
        <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
            <nav className="space-y-2">
                {navItems.map(item => {
                    const IconComponent = item.icon; // Get the component type
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            // Handle end prop for the main dashboard link to avoid it always being active
                            end={item.path === '/admin/dashboard'}
                            className={({ isActive }) =>
                                // ADDED flex layout to support icons
                                `flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
                            }
                        >
                            {/* Render the icon component */}
                            <IconComponent className="h-5 w-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;