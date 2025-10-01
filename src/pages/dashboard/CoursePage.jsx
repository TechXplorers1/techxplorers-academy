import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ref, update } from "firebase/database";
import { auth, db } from '../../firebase';

const CoursePage = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , user, enrolledCourses, setEnrolledCourses }) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState({});

    useEffect(() => {
        const allCourses = coursesData ? Object.values(coursesData).flat() : [];
        const foundCourseData = allCourses.find(c => c.id === courseId);
        
        const enrolledCourse = enrolledCourses.find(c => c.id === courseId);

        if (foundCourseData && enrolledCourse) {
            const courseWithProgress = {
                ...foundCourseData,
                progress: enrolledCourse.progress || 0,
                completedLessons: enrolledCourse.completedLessons || {}
            };
            setCourse(courseWithProgress);
            setCompletedLessons(courseWithProgress.completedLessons);

            if (courseWithProgress.modules && courseWithProgress.modules.length > 0) {
                let allLessons = courseWithProgress.modules.flatMap(module => Object.values(module.lessons || {}));
                if (allLessons.length > 0) {
                    let firstIncompleteLesson = allLessons.find(lesson => !courseWithProgress.completedLessons[lesson.id]);
                    setCurrentLesson(firstIncompleteLesson || allLessons[0]);
                }
            }
        }
    }, [courseId, enrolledCourses, coursesData]);

    const handleLessonClick = (lesson) => {
        setCurrentLesson(lesson);
    };

    const handleMarkAsComplete = async (lessonId) => {
        if (!auth.currentUser || !course) return;

        const newCompletedLessons = { ...completedLessons, [lessonId]: true };
        const allLessonsCount = course.modules.flatMap(module => Object.values(module.lessons || {})).length;
        const newCompletedCount = Object.keys(newCompletedLessons).length;
        const newProgress = allLessonsCount > 0 ? Math.floor((newCompletedCount / allLessonsCount) * 100) : 0;

        const userCourseRef = ref(db, `users/${auth.currentUser.uid}/enrolledCourses/${courseId}`);
        await update(userCourseRef, {
            progress: newProgress,
            completedLessons: newCompletedLessons
        });
        
        setCompletedLessons(newCompletedLessons);
        
        setEnrolledCourses(prevEnrolled => {
            return prevEnrolled.map(c => c.id === courseId ? { ...c, progress: newProgress, completedLessons: newCompletedLessons } : c);
        });
    };

    const handleNextLesson = () => {
        if (!currentLesson || !course || !course.modules) return;

        let allLessons = course.modules.flatMap(module => Object.values(module.lessons || {}));
        const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);

        if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
            setCurrentLesson(allLessons[currentIndex + 1]);
        } else {
            alert("You have completed all lessons in this course!");
        }
    };

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
                    <p className="text-gray-600">The course you are looking for does not exist or you are not enrolled in it.</p>
                    <Link to="/dashboard/enrolled-courses" className="mt-6 inline-block text-purple-600 font-semibold hover:underline">
                        ← Back to My Courses
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} user={user} />

            <main className="flex flex-col lg:flex-row h-full" style={{ height: 'calc(100vh - 80px)' }}>
                <div className="lg:flex-grow p-4 md:p-8 bg-gray-900 flex flex-col justify-between">
                    <div className="w-full flex-grow flex items-center justify-center">
                        {currentLesson && currentLesson.videoUrl ? (
                            <div className="w-full h-full lg:w-4/5 xl:w-3/4 aspect-video">
                                <iframe
                                    className="w-full h-full rounded-xl shadow-2xl bg-black"
                                    src={currentLesson.videoUrl}
                                    title={currentLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="text-white text-center p-8 bg-gray-800 rounded-lg">
                                <h2 className="text-2xl font-bold">Welcome to {course.title}!</h2>
                                <p className="mt-2 text-gray-400">Select a lesson from the sidebar to begin your learning journey.</p>
                            </div>
                        )}
                    </div>
                    {currentLesson && (
                        <div className="mt-4 text-center pb-4">
                             <h2 className="text-2xl font-bold text-white mb-4">{currentLesson.title}</h2>
                            <button
                                onClick={() => handleMarkAsComplete(currentLesson.id)}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${completedLessons[currentLesson.id] ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
                                disabled={completedLessons[currentLesson.id]}
                            >
                                {completedLessons[currentLesson.id] ? '✓ Completed' : 'Mark as Complete'}
                            </button>
                            <button
                                onClick={handleNextLesson}
                                className="ml-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                            >
                                Next Lesson →
                            </button>
                        </div>
                    )}
                </div>

                <aside className="lg:w-96 bg-white shadow-md p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
                    {(course.modules || []).map((module, index) => (
                        <div key={module.id || index} className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                            <ul className="space-y-2">
                                {Object.values(module.lessons || {}).map(lesson => (
                                    <li
                                        key={lesson.id}
                                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                            currentLesson && currentLesson.id === lesson.id ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handleLessonClick(lesson)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 flex-shrink-0 ${completedLessons[lesson.id] ? 'text-green-500' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                                            {completedLessons[lesson.id] ?
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /> :
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            }
                                        </svg>
                                        <span>{lesson.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link to="/dashboard/enrolled-courses" className="text-sm text-purple-600 font-semibold hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to My Courses
                        </Link>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default CoursePage;