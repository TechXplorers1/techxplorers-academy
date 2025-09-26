import React from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const LiveClassManagement = (props) => {
    // Placeholder data - in a real app, this would be fetched from Firebase
    const liveClasses = [
        { id: 'advanced-react-hooks', title: 'Advanced React Hooks', instructor: 'Jane Smith', date: 'October 28, 2025' },
        { id: 'fundamentals-of-ai-ml', title: 'Fundamentals of AI & Machine Learning', instructor: 'Sam Lee', date: 'November 5, 2025' },
    ];

    return (
        <AdminDashboardTemplate {...props} title="Live Class Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Live Classes</h2>
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Schedule New Class
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Title</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Instructor</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveClasses.map((cls) => (
                                <tr key={cls.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{cls.title}</td>
                                    <td className="py-3 px-4 border-b">{cls.instructor}</td>
                                    <td className="py-3 px-4 border-b">{cls.date}</td>
                                    <td className="py-3 px-4 border-b">
                                        <button className="text-purple-600 hover:underline font-semibold">Edit</button>
                                        <button className="text-red-600 hover:underline font-semibold ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboardTemplate>
    );
};

export default LiveClassManagement;