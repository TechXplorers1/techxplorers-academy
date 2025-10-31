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
    FaTags,
    FaTimes // Import the "close" icon
} from 'react-icons/fa';
import { MdDashboard, MdLiveTv } from 'react-icons/md';

// 1. Accept 'isOpen' and 'toggleMenu' as props
const AdminSidebar = ({ isOpen, toggleMenu }) => {
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
        { name: 'User Management', path: '/admin/users', icon: FaUsers },
        { name: 'Course Management', path: '/admin/courses', icon: FaBook },
        { name: 'Live Class Management', path: '/admin/live-classes', icon: MdLiveTv },
        { name: 'Instructor Management', path: '/admin/instructors', icon: FaChalkboardTeacher },
        { name: 'Blog Management', path: '/admin/blogs', icon: FaPencilAlt },
        { name: 'Order Management', path: '/admin/orders', icon: FaFileInvoiceDollar },
        { name: 'Success Stories', path: '/admin/success-stories', icon: FaTrophy },
        { name: 'Community Events', path: '/admin/community-events', icon: FaCalendarAlt }, 
        { name: 'Coupon Management', path: '/admin/coupons', icon: FaTags },
    ];

    const activeLinkClass = "bg-blue-600 text-white";
    const inactiveLinkClass = "text-gray-700 hover:bg-blue-50 hover:text-blue-700";

    return (
        <>
            {/* 2. The <aside> now handles all its own positioning */}
            <aside 
                className={`
                    fixed top-0 left-0 z-50 h-screen w-64 bg-white p-6 rounded-r-2xl shadow-lg 
                    transform transition-transform duration-300 ease-in-out
                    
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}

                    lg:relative lg:translate-x-0 lg:col-span-1 lg:h-auto 
                    lg:rounded-2xl lg:sticky lg:top-8
                `}
            >
                {/* 3. Mobile-only header with a Close button */}
                <div className="flex justify-between items-center lg:hidden mb-4">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
                        <FaTimes size={20} />
                    </button>
                </div>

                <nav className="space-y-2">
                    {navItems.map(item => {
                        const IconComponent = item.icon; 
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/admin/dashboard'}
                                // 4. On mobile, close the menu when a link is clicked
                                onClick={() => {
                                    if (isOpen) toggleMenu();
                                }}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
                                }
                            >
                                <IconComponent className="h-5 w-5" />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
            
            {/* 5. Overlay: Dims the background on mobile when menu is open */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
                    onClick={toggleMenu}
                ></div>
            )}
        </>
    );
};

export default AdminSidebar;