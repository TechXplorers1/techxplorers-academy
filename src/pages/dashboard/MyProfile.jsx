// MyProfile.jsx
import React, { useState, useEffect } from 'react';
import DashboardPageTemplate from '../DashboardPageTemplate';
import { ref, update } from "firebase/database";
import { auth, db } from '../../firebase';

const MyProfile = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , user }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user && user.name) {
            const nameParts = user.name.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const currentUser = auth.currentUser;
        if (currentUser) {
            const userRef = ref(db, 'users/' + currentUser.uid);
            try {
                await update(userRef, {
                    firstName: firstName,
                    lastName: lastName,
                });
                alert("Profile updated successfully!");
                setIsEditing(false);
            } catch (error) {
                alert("Failed to update profile: " + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <DashboardPageTemplate
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            cartItemsCount={cartItemsCount}
            title="My Profile"
            user={user}
        >
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 transition-all duration-300 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                readOnly={!isEditing}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 transition-all duration-300 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm p-2 transition-all duration-300"
                        />
                    </div>
                    <div className="pt-4 flex justify-end space-x-4">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isLoading}
                                    className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                                >
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
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