import React from 'react';
import { Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const MyLiveClasses = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , user, registeredLiveClasses, liveClassesData }) => {

    const getFullLiveClasses = () => {
        // Since registeredLiveClasses is now an array of IDs, we can map directly
        return registeredLiveClasses.map(classId => {
            const liveClass = liveClassesData.find(cls => cls.id === classId);
            return liveClass || null;
        }).filter(Boolean);
    };

    const fullRegisteredClasses = getFullLiveClasses();
    
    return (
        <DashboardPageTemplate isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} title="My Live Classes" user={user}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Live Class Recordings</h3>
                {fullRegisteredClasses && fullRegisteredClasses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fullRegisteredClasses.map((liveClass) => (
                            <Link
                                key={liveClass.id}
                                to={`/dashboard/live-class/${liveClass.id}`}
                                className="block p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                            >
                                <img src={liveClass.image} alt={liveClass.title} className="w-full h-40 object-cover rounded-md mb-4" />
                                <h4 className="text-lg font-bold text-gray-800">{liveClass.title}</h4>
                                <p className="text-sm text-gray-600 mt-2">Instructor: {liveClass.instructor}</p>
                                <span className="mt-2 inline-block text-sm font-medium text-purple-600 hover:underline">
                                    View Recordings →
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg">
                            You haven't registered for any live classes yet.
                        </p>
                        <p className="text-gray-500 text-md mt-2">
                            <Link to="/more/live-classes" className="text-purple-600 font-semibold hover:underline">
                                Browse available live classes
                            </Link> to get started!
                        </p>
                    </div>
                )}
            </div>
        </DashboardPageTemplate>
    );
};

export default MyLiveClasses;