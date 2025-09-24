import React from 'react';
import DashboardPageTemplate from '../DashboardPageTemplate';

const Settings = ({ isLoggedIn, onLogout, cartItemsCount, coursesData  }) => {
    return (
        <DashboardPageTemplate 
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            cartItemsCount={cartItemsCount}
            title="Settings"
        >
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium">Change Password</label>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors transform duration-300 hover:scale-105">
                            Change
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium">Delete Account</label>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors transform duration-300 hover:scale-105">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-bold mb-6">Notification Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700">Email Notifications</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="email-toggle" id="email-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="email-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700">Push Notifications</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="push-toggle" id="push-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="push-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardPageTemplate>
    );
};

export default Settings;