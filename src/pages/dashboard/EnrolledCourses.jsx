import React from 'react';
import { Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const EnrolledCourses = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , user, enrolledCourses }) => {
    
    // Combine enrolled course data with full course details
    const getFullEnrolledCourses = () => {
        // Convert the coursesData object into an array of courses
        const allCourses = Object.values(coursesData || {});
        
        return enrolledCourses.map(enrolledCourse => {
            const courseDetails = allCourses.find(course => course.id === enrolledCourse.id);
            // Return a combined object with user-specific data (progress) and full course details
            return courseDetails ? { ...courseDetails, progress: enrolledCourse.progress, completedLessons: enrolledCourse.completedLessons } : null;
        }).filter(Boolean); // Filter out any courses that weren't found
    };

    const fullEnrolledCourses = getFullEnrolledCourses();

    // Filter courses based on progress status
    const inProgressCourses = fullEnrolledCourses.filter(course => (course.progress || 0) < 100);
    const completedCourses = fullEnrolledCourses.filter(course => (course.progress || 0) === 100);
    const hasEnrolledCourses = fullEnrolledCourses.length > 0;

    const CourseCard = ({ course }) => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h4 className="text-lg font-bold mb-2">{course.title}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{course.progress || 0}% Complete</p>
                <Link to={`/course/${course.id}`} className="block text-center bg-purple-600 text-white font-semibold py-2 rounded-full hover:bg-purple-700 transition-colors">
                    {course.progress === 100 ? 'View Course' : 'Resume Course'}
                </Link>
            </div>
        </div>
    );

    return (
        <DashboardPageTemplate 
            isLoggedIn={isLoggedIn} 
            onLogout={onLogout} 
            cartItemsCount={cartItemsCount} 
            title="Enrolled Courses"
            user={user}
        >
            {hasEnrolledCourses ? (
                <div className="space-y-8">
                    {inProgressCourses.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">In Progress</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {inProgressCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </div>
                    )}
                    {completedCourses.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Completed</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {completedCourses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-[1.01]">
                    <p className="text-lg text-gray-500">You are not enrolled in any courses yet.</p>
                    <Link to="/all-stacks/free-stacks" className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Explore Courses
                    </Link>
                </div>
            )}
        </DashboardPageTemplate>
    );
};

export default EnrolledCourses;