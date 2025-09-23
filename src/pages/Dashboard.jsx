import React from 'react';
import DashboardPageTemplate from './DashboardPageTemplate';

const Dashboard = ({ isLoggedIn, onLogout, cartItemsCount, registeredLiveClassesCount, enrolledCourses = [] }) => {
    const totalEnrolled = enrolledCourses.length;
    const completedCoursesCount = enrolledCourses.filter(course => (course.progress || 0) === 100).length;

    const DashboardCard = ({ title, value, icon, bgColor, textColor }) => (
        <div className={`p-6 rounded-2xl shadow-lg flex items-center space-x-4 transform transition-transform duration-300 hover:scale-[1.03] ${bgColor} ${textColor}`}>
            <div className="flex-shrink-0">
                <div className="rounded-full bg-white bg-opacity-30 p-3">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
            </div>
            <div>
                <p className="text-xl font-semibold">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
        </div>
    );

    return (
        <DashboardPageTemplate isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} title="Dashboard">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="Enrolled Courses"
                    value={totalEnrolled}
                    icon="M12 14l9-5-9-5-9 5 9 5z"
                    bgColor="bg-purple-600"
                    textColor="text-white"
                />
                <DashboardCard
                    title="Completed Courses"
                    value={completedCoursesCount}
                    icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    bgColor="bg-green-600"
                    textColor="text-white"
                />
                <DashboardCard
                    title="Live Classes"
                    value={registeredLiveClassesCount}
                    icon="M15 10l4.553-2.276A1 1 0 0121 8.71v6.58a1 1 0 01-1.447.894L15 14m-5-4v4m0 0v4H6a2 2 0 01-2-2v-4a2 2 0 012-2h4z"
                    bgColor="bg-red-600"
                    textColor="text-white"
                />
            </div>

            {/* Profile Upload */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-transform transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-bold mb-4">Set Your Profile Photo</h3>
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                    <p className="text-gray-500">Upload an image to personalize your profile.</p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Click Here
                    </button>
                </div>
            </div>
        </DashboardPageTemplate>
    );
};

export default Dashboard;