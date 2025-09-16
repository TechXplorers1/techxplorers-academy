import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CoursePage = ({ isLoggedIn }) => {
    const { courseId } = useParams();
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState({});

    // Dummy course data with a more detailed structure
    const dummyCourseData = {
        1: {
            title: "UX/UI Design: From Beginner to Pro",
            subtitle: "Learn how to build beautiful and functional user experiences from scratch.",
            modules: [
                {
                    id: 1,
                    title: "Module 1: Foundations of UX/UI",
                    lessons: [
                        { id: 101, title: "1.1 What is UX/UI Design?", videoUrl: "https://www.youtube.com/embed/j_8-Bq31F6I" },
                        { id: 102, title: "1.2 The Design Thinking Process", videoUrl: "https://www.youtube.com/embed/aCBlW_K4eF4" },
                        { id: 103, title: "1.3 Introduction to Figma", videoUrl: "https://www.youtube.com/embed/oK2yZpD8sY8" },
                    ]
                },
                {
                    id: 2,
                    title: "Module 2: User Research & Strategy",
                    lessons: [
                        { id: 201, title: "2.1 Conducting User Interviews", videoUrl: "https://www.youtube.com/embed/ZfI8jQp4X0E" },
                        { id: 202, title: "2.2 Creating User Personas", videoUrl: "https://www.youtube.com/embed/WJ7v9B5gL6k" },
                        { id: 203, title: "2.3 Journey Mapping", videoUrl: "https://www.youtube.com/embed/xMYo9jaMah8" },
                    ]
                },
            ],
            instructor: { name: "Jane Doe", profession: "Senior UX Designer" }
        },
    };

    const course = dummyCourseData[courseId];

    // Set the first lesson as the default when the page loads
    useEffect(() => {
        if (course && !currentLesson) {
            setCurrentLesson(course.modules[0].lessons[0]);
        }
    }, [course, currentLesson]);

    const handleLessonClick = (lesson) => {
        setCurrentLesson(lesson);
    };

    const handleMarkAsComplete = (lessonId) => {
        setCompletedLessons(prev => ({ ...prev, [lessonId]: true }));
    };

    const handleNextLesson = () => {
        if (!currentLesson) return;

        let foundNext = false;
        for (let i = 0; i < course.modules.length; i++) {
            const module = course.modules[i];
            const lessonIndex = module.lessons.findIndex(l => l.id === currentLesson.id);
            
            if (lessonIndex !== -1) {
                // Check for next lesson in the current module
                if (lessonIndex < module.lessons.length - 1) {
                    setCurrentLesson(module.lessons[lessonIndex + 1]);
                    foundNext = true;
                    break;
                }
                // Check for next lesson in the next module
                else if (i < course.modules.length - 1) {
                    const nextModule = course.modules[i + 1];
                    if (nextModule.lessons.length > 0) {
                        setCurrentLesson(nextModule.lessons[0]);
                        foundNext = true;
                        break;
                    }
                }
            }
        }
        if (!foundNext) {
            alert("You have completed all lessons in this course!");
        }
    };

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Course not found.</h2>
                    <p>The course you are looking for does not exist or has not been created yet.</p>
                    <Link to="/dashboard/enrolled-courses" className="mt-6 inline-block text-purple-600 hover:underline">
                        Go back to your courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            {/* Header */}
            <header className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/dashboard/enrolled-courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
                            <p className="text-sm text-gray-500">{currentLesson ? currentLesson.title : 'Select a lesson to begin'}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-4rem)]">
                {/* Video Player Section */}
                <div className="lg:flex-grow p-6 md:p-8 bg-gray-900 flex flex-col justify-center">
                    <div className="w-full flex-grow flex items-center justify-center">
                        {currentLesson ? (
                            <div className="w-full h-full lg:w-4/5 xl:w-3/4 aspect-video">
                                <iframe
                                    className="w-full h-full rounded-xl shadow-2xl"
                                    src={currentLesson.videoUrl}
                                    title={currentLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="text-white text-center">
                                <h2 className="text-2xl font-bold">Welcome to the Course!</h2>
                                <p className="mt-2 text-gray-400">Select a lesson from the sidebar to begin your learning journey.</p>
                            </div>
                        )}
                    </div>
                    {currentLesson && (
                        <div className="mt-6 text-center">
                            <button 
                                onClick={() => handleMarkAsComplete(currentLesson.id)}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${completedLessons[currentLesson.id] ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
                            >
                                {completedLessons[currentLesson.id] ? 'Completed!' : 'Mark as Complete'}
                            </button>
                            <button 
                                onClick={handleNextLesson}
                                className="ml-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                            >
                                Next Lesson
                            </button>
                        </div>
                    )}
                </div>

                {/* Course Content Sidebar */}
                <aside className="lg:w-96 bg-white shadow-md p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
                    {course.modules.map(module => (
                        <div key={module.id} className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                            <ul className="space-y-2">
                                {module.lessons.map(lesson => (
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