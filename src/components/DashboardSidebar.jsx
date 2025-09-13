import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
    const location = useLocation();

    const dashboardNavItems = [
        { name: 'Dashboard', path: '/dashboard', icon: 'M4 4v5h.582m15.836 0L19.5 4v5m-15.836 0h15.836m-15.836 0l-.034 6.551M19.5 9h-15.836m15.836 0l.034 6.551m0 0a2.028 2.028 0 00.999-.404C21.785 15.347 22 14.868 22 14.362V11c-.054 1.1-.967 2-2.107 2h-1.528A2.84 2.84 0 0115 11.5v-2c0-.9.7-1.5 1.5-1.5h1.528A2.84 2.84 0 0122 8.5V4h-.478c-1.11 0-2.023.9-2.107 2H15c-1.14 0-2.107-.9-2.107-2H7v10h10V4zM2 14v-2h2a2 2 0 012-2h14v10H2V14z' },
        { name: 'My Profile', path: '/dashboard/my-profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { name: 'Enrolled Courses', path: '/dashboard/enrolled-courses', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
        { name: 'Wishlist', path: '/dashboard/wishlist', icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
        { name: 'Order History', path: '/dashboard/order-history', icon: 'M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3z' },
        { name: 'Settings', path: '/dashboard/settings', icon: 'M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' },
        { name: 'Logout', path: '/', icon: 'M17 16l4-4m0 0l-4-4m4 4H7' },
    ];

    return (
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-8">
            <h3 className="text-lg font-bold mb-4">Dashboard</h3>
            <ul className="space-y-2">
                {dashboardNavItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardSidebar;