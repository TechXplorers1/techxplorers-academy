import React from 'react';
import { Link } from 'react-router-dom';
import AdminDashboardTemplate from './AdminDashboardTemplate';
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
import { MdLiveTv } from 'react-icons/md';

const AdminDashboard = (props) => {
    const adminFeatures = [
        // { name: 'Analytics', path: '/admin/analytics', icon: FaChartBar }, // Example if you add it back
        { name: 'User Management', path: '/admin/users', icon: FaUsers },
        { name: 'Course Management', path: '/admin/courses', icon: FaBook },
        { name: 'Live Classes', path: '/admin/live-classes', icon: MdLiveTv },
        { name: 'Instructor Mgt.', path: '/admin/instructors', icon: FaChalkboardTeacher },
        { name: 'Blog Management', path: '/admin/blogs', icon: FaPencilAlt },
        { name: 'Order Management', path: '/admin/orders', icon: FaFileInvoiceDollar },
        { name: 'Success Stories', path: '/admin/success-stories', icon: FaTrophy },
        { name: 'Community Events', path: '/admin/community-events', icon: FaCalendarAlt }, // NEW
        { name: 'Coupon Management', path: '/admin/coupons', icon: FaTags },
    ];

    return (
        <AdminDashboardTemplate {...props} title="Admin Dashboard">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminFeatures.map(feature => {
                        const IconComponent = feature.icon; // Get the component type
                        return (
                            <Link
                                key={feature.name}
                                to={feature.path}
                                className="block p-6 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-4 transform transition-transform duration-300 hover:scale-[1.03] bg-gray-50 hover:shadow-xl"
                            >
                                <div className="flex-shrink-0">
                                    <div className="rounded-full bg-purple-100 p-4">
                                        {/* Render the icon component with classes */}
                                        <IconComponent className="h-10 w-10 text-purple-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 text-center">{feature.name}</h3>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AdminDashboardTemplate>
    );
};

export default AdminDashboard;