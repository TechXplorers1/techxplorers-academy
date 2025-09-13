import React from 'react';
import { Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const EnrolledCourses = ({ isLoggedIn }) => {
    const enrolledCourses = [
        {
            id: 1,
            title: "UX/UI Design: From Beginner to Pro",
            progress: 75,
            image: "https://placehold.co/300x200/F1EFE9/4A235A?text=UX/UI+Course"
        },
        {
            id: 2,
            title: "Introduction to Data Analytics",
            progress: 50,
            image: "https://placehold.co/300x200/E9F1EF/234A5A?text=Data+Analytics+Course"
        },
        {
            id: 3,
            title: "Marketing Strategies for Startups",
            progress: 25,
            image: "https://placehold.co/300x200/F1E9EF/5A234A?text=Marketing+Course"
        },
    ];

    const CourseCard = ({ course }) => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h4 className="text-lg font-bold mb-2">{course.title}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{course.progress}% Complete</p>
                <Link to={`/course/${course.id}`} className="block text-center bg-purple-600 text-white font-semibold py-2 rounded-full hover:bg-purple-700 transition-colors">
                    Resume Course
                </Link>
            </div>
        </div>
    );

    return (
        <DashboardPageTemplate isLoggedIn={isLoggedIn} title="Enrolled Courses">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            {enrolledCourses.length === 0 && (
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