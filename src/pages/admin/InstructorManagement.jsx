import React, { useState, useEffect } from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { db } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';

const InstructorManagement = (props) => {
    const [pendingApplications, setPendingApplications] = useState([]);
    const [approvedInstructors, setApprovedInstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        // Listener for instructor applications
        const applicationsRef = ref(db, 'instructorApplications/');
        const unsubscribeApps = onValue(applicationsRef, (snapshot) => {
            const data = snapshot.val();
            const loadedApps = data ? Object.values(data).filter(app => app.status === 'pending') : [];
            setPendingApplications(loadedApps);
        });

        // Listener for approved instructors (users with role 'instructor')
        const usersRef = ref(db, 'users/');
        const unsubscribeUsers = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const loadedInstructors = data ? Object.values(data).filter(user => user.role === 'instructor') : [];
            setApprovedInstructors(loadedInstructors);
        });
        
        setIsLoading(false);
        return () => {
            unsubscribeApps();
            unsubscribeUsers();
        };
    }, []);

    const handleApproval = async (application, newStatus) => {
        const appRef = ref(db, `instructorApplications/${application.uid}`);
        const userRef = ref(db, `users/${application.uid}`);

        try {
            await update(appRef, { status: newStatus });
            if (newStatus === 'approved') {
                await update(userRef, { role: 'instructor' });
                alert(`${application.fullName} has been approved as an instructor.`);
            } else {
                alert(`${application.fullName}'s application has been rejected.`);
            }
            setIsModalOpen(false); // Close the modal after action
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    // Function to open the details modal
    const viewApplicationDetails = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    return (
        <AdminDashboardTemplate {...props} title="Instructor Management">
            {/* Pending Applications Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Instructor Applications</h2>
                {isLoading ? <p>Loading...</p> : pendingApplications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Email</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingApplications.map((app) => (
                                    <tr key={app.uid} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{app.fullName}</td>
                                        <td className="py-3 px-4 border-b">{app.email}</td>
                                        <td className="py-3 px-4 border-b">
                                            <button onClick={() => viewApplicationDetails(app)} className="text-blue-600 hover:underline font-semibold">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-gray-500">No pending applications.</p>}
            </div>

            {/* Approved Instructors Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Approved Instructors</h2>
                {isLoading ? <p>Loading...</p> : approvedInstructors.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                           <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedInstructors.map((inst) => (
                                    <tr key={inst.email} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{inst.firstName} {inst.lastName}</td>
                                        <td className="py-3 px-4 border-b">{inst.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-gray-500">No approved instructors yet.</p>}
            </div>

            {/* Application Details Modal */}
            {isModalOpen && selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">Application Details</h2>
                        <div className="space-y-4 text-left">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                <p className="text-lg text-gray-800">{selectedApplication.fullName}</p>
                            </div>
                             <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="text-lg text-gray-800">{selectedApplication.email}</p>
                            </div>
                             <div>
                                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                <p className="text-lg text-gray-800">{selectedApplication.phone || 'Not provided'}</p>
                            </div>
                             <div>
                                <h3 className="text-sm font-medium text-gray-500">Portfolio / LinkedIn</h3>
                                <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline break-all">{selectedApplication.website || 'Not provided'}</a>
                            </div>
                             <div>
                                <h3 className="text-sm font-medium text-gray-500">Professional Background</h3>
                                <p className="text-md text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{selectedApplication.background}</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-8">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">
                                Close
                            </button>
                            <button onClick={() => handleApproval(selectedApplication, 'rejected')} className="px-5 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700">
                                Reject
                            </button>
                            <button onClick={() => handleApproval(selectedApplication, 'approved')} className="px-5 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700">
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminDashboardTemplate>
    );
};

export default InstructorManagement;