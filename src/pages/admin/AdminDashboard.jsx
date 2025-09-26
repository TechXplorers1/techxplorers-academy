import React from 'react';
import { Link } from 'react-router-dom';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const AdminDashboard = (props) => {
    const adminFeatures = [
        // { name: 'Analytics', path: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6' },
        { name: 'User Management', path: '/admin/users', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { name: 'Course Management', path: '/admin/courses', icon: 'M12 6.253v13.5m0-13.5c-4.82 0-8.75 3.197-8.75 7.124' },
        { name: 'Live Classes', path: '/admin/live-classes', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.71v6.58a1 1 0 01-1.447.894L15 14m-5-4v4m0 0v4H6a2 2 0 01-2-2v-4a2 2 0 012-2h4z' },
        { name: 'Instructor Mgt.', path: '/admin/instructors', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6' },
        { name: 'Blog Management', path: '/admin/blogs', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.586-9.414a2 2 0 112.828 2.828L10.5 17.5-6 18l.5-6.5 7.086-7.086z' },
        { name: 'Order Management', path: '/admin/orders', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        { name: 'Coupon Management', path: '/admin/coupons', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    ];

    return (
        <AdminDashboardTemplate {...props} title="Admin Dashboard">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminFeatures.map(feature => (
                        <Link
                            key={feature.name}
                            to={feature.path}
                            className="block p-6 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-4 transform transition-transform duration-300 hover:scale-[1.03] bg-gray-50 hover:shadow-xl"
                        >
                            <div className="flex-shrink-0">
                                <div className="rounded-full bg-purple-100 p-4">
                                    <svg className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 text-center">{feature.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminDashboardTemplate>
    );
};

export default AdminDashboard;