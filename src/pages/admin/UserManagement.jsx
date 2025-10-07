import React, { useState, useEffect } from 'react';
import { ref, onValue, set, update } from "firebase/database";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { db, auth as mainAuth } from '../../firebase';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const UserManagement = (props) => {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentUserData, setCurrentUserData] = useState(null);

    // --- Fetch all users from Firebase ---
    useEffect(() => {
        const usersRef = ref(db, 'users/');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedUsers = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setUsersList(loadedUsers);
            } else {
                setUsersList([]);
            }
            setIsLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    // --- Modal and Form Handlers ---
    const openModal = (mode, user = null) => {
        setModalMode(mode);
        if (mode === 'add') {
            setCurrentUserData({ firstName: '', lastName: '', email: '', role: 'user' }); 
        } else {
            setCurrentUserData(user);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUserData(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!currentUserData.email || !currentUserData.firstName || !currentUserData.lastName) {
            alert("Please fill out all required fields.");
            return;
        }

        if (modalMode === 'add') {
            const tempPassword = 'tempPassword123'; // Dummy password for initial creation
            
            // IMPORTANT: We do not attempt to restore the session here using a token, 
            // as this is handled better by the global AuthContext listener. 
            // We just ensure the new user is signed out immediately.

            try {
                // 1. Create a Firebase Auth user (logs admin out)
                const userCredential = await createUserWithEmailAndPassword(mainAuth, currentUserData.email, tempPassword);
                const createdUserAuth = userCredential.user;
                
                // 2. Create the user record in the Realtime Database
                const userRef = ref(db, 'users/' + createdUserAuth.uid);
                await set(userRef, {
                    firstName: currentUserData.firstName,
                    lastName: currentUserData.lastName,
                    email: currentUserData.email,
                    role: currentUserData.role,
                    cart: {}, wishlist: {}, enrolledCourses: {}, registeredLiveClasses: {}
                });

                // 3. Immediately send a Password Reset Email
                await sendPasswordResetEmail(mainAuth, currentUserData.email);
                
                // 4. FIX: Immediately sign out the newly created user! 
                // This clears the new user's session, allowing the AuthContext listener 
                // to detect the admin's previous session (via persistence) and automatically
                // log the admin back in.
                await signOut(mainAuth); 

                alert(`User ${currentUserData.email} created. A link to set their password has been sent to their email. Your admin session should be restored.`);
                closeModal();
            } catch (error) {
                // If the user creation fails, we must check if the current user is still the new user 
                // (which should not happen if creation failed) and log out just in case.
                
                // NOTE: The `createUserWithEmailAndPassword` call should only succeed if the admin 
                // was still authenticated, and it will automatically log the *new* user in.
                
                alert(`Error creating user: ${error.message}. Please try again.`);
            }
        } else {
            // --- Logic for Editing an Existing User ---
            try {
                const userRef = ref(db, 'users/' + currentUserData.id);
                await update(userRef, {
                    firstName: currentUserData.firstName,
                    lastName: currentUserData.lastName,
                    role: currentUserData.role,
                });
                alert(`Successfully updated user: ${currentUserData.email}`);
                closeModal();
            } catch (error) {
                alert(`Error updating user: ${error.message}`);
            }
        }
    };

    return (
        <AdminDashboardTemplate {...props} title="User Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
                    <button 
                        onClick={() => openModal('add')}
                        className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                    >
                        Add New User
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Role</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading...</td></tr>
                            ) : (
                                usersList.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{user.firstName} {user.lastName}</td>
                                        <td className="py-3 px-4 border-b">{user.email}</td>
                                        <td className="py-3 px-4 border-b">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            <button onClick={() => openModal('edit', user)} className="text-purple-600 hover:underline font-semibold">Edit</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">{modalMode === 'add' ? 'Create New User' : 'Edit User'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-4">
                                <input type="text" name="firstName" placeholder="First Name" value={currentUserData.firstName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                <input type="text" name="lastName" placeholder="Last Name" value={currentUserData.lastName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    value={currentUserData.email} 
                                    onChange={handleInputChange} 
                                    className={`w-full px-4 py-2 border rounded-lg ${modalMode === 'edit' ? 'bg-gray-100' : ''}`}
                                    required 
                                    disabled={modalMode === 'edit'}
                                />
                                {/* Display note about password reset email */}
                                {modalMode === 'add' && (
                                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                        Note: A password link will be automatically sent to the new user's email to set their password.
                                    </p>
                                )}
                                <select name="role" value={currentUserData.role} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={closeModal} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">
                                    {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminDashboardTemplate>
    );
};

export default UserManagement;