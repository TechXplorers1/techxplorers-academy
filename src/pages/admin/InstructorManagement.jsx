import React from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const InstructorManagement = (props) => {
    // Placeholder data
    const instructors = [
        { id: 1, name: 'Victoria', title: 'Lead Business Analyst' },
        { id: 2, name: 'Alex Miller', title: 'JavaScript Guru' },
        { id: 3, name: 'Jane Smith', title: 'Data Scientist' },
    ];

    return (
        <AdminDashboardTemplate {...props} title="Instructor Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Instructors & Mentors</h2>
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Add New Instructor
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Title / Expertise</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructors.map((inst) => (
                                <tr key={inst.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{inst.name}</td>
                                    <td className="py-3 px-4 border-b">{inst.title}</td>
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

export default InstructorManagement;