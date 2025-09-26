import React from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const BlogManagement = (props) => {
     // In a real app, you would fetch this data from your database
    const blogPosts = [
        { id: 1, title: 'The Future of AI in Web Development', author: 'Alex Miller' },
        { id: 2, title: 'Getting Started with Tailwind CSS', author: 'Sarah Chen' },
    ];
    return (
        <AdminDashboardTemplate {...props} title="Blog Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Blog Posts</h2>
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Add New Post
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Title</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Author</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{post.title}</td>
                                    <td className="py-3 px-4 border-b">{post.author}</td>
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

export default BlogManagement;