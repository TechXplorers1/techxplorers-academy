import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        // { name: 'Analytics', path: '/admin/analytics' },
        { name: 'User Management', path: '/admin/users' },
        { name: 'Course Management', path: '/admin/courses' },
        { name: 'Live Class Management', path: '/admin/live-classes' },
        { name: 'Instructor Management', path: '/admin/instructors' },
        { name: 'Blog Management', path: '/admin/blogs' },
        { name: 'Order Management', path: '/admin/orders' },
        { name: 'Coupon Management', path: '/admin/coupons' },
    ];

    const activeLinkClass = "bg-purple-600 text-white";
    const inactiveLinkClass = "text-gray-700 hover:bg-purple-100 hover:text-purple-700";

    return (
        <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
            <nav className="space-y-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        // Handle end prop for the main dashboard link to avoid it always being active
                        end={item.path === '/admin/dashboard'}
                        className={({ isActive }) => 
                            `block w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;