import React from 'react';
import DashboardPageTemplate from '../DashboardPageTemplate';

const MyProfile = ({ isLoggedIn }) => {
    const user = {
        name: "Chaveen Reddy",
        email: "chaveen.r@example.com"
    };

    return (
        <DashboardPageTemplate isLoggedIn={isLoggedIn} title="My Profile">
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 transition-all duration-300"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-bold mb-6">Update Profile Photo</h3>
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center transition-all duration-300 hover:border-purple-500">
                    <p className="text-gray-500">Drag 'n' drop or click to upload a new image.</p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors transform duration-300 hover:scale-105">
                        Upload Photo
                    </button>
                </div>
            </div>
        </DashboardPageTemplate>
    );
};

export default MyProfile;