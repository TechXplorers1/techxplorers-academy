import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, get } from "firebase/database";
import { db } from '../firebase';
import { toCamelCase } from '../utils/categoryHelper';

// 1. Create the Context
const CourseContext = createContext();

// Custom hook to use the Course context
export const useCourse = () => {
    return useContext(CourseContext);
};

// 2. Create the Provider Component
export const CourseProvider = ({ children }) => {
    // Data states
    const [coursesData, setCoursesData] = useState({});
    const [liveClassesData, setLiveClassesData] = useState([]);
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [instructorApplications, setInstructorApplications] = useState([]);
    const [successStoriesData, setSuccessStoriesData] = useState([]);
    const [communityEventsData, setCommunityEventsData] = useState([]);

    // Calculated course structures
    const [allCoursesFlatList, setAllCoursesFlatList] = useState([]);
    const [allCoursesFullObject, setAllCoursesFullObject] = useState({});

    useEffect(() => {
        // --- Data fetching for courses, classes, applications, and blogs ---
        // Optimization: Switched to 'get' for one-time fetch to reduce bandwidth
        const fetchData = async () => {
            try {
                // 1. Courses
                const coursesRef = ref(db, 'courses');
                const coursesSnapshot = await get(coursesRef);
                const coursesData = coursesSnapshot.val() || {};
                const allCourses = Object.values(coursesData);

                // Process Courses
                const grouped = allCourses.reduce((acc, course) => {
                    const key = toCamelCase(course.category);
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(course);
                    return acc;
                }, {});
                setCoursesData(grouped);
                setAllCoursesFlatList(allCourses);
                const fullObject = allCourses.reduce((obj, course) => {
                    obj[course.id] = course;
                    return obj;
                }, {});
                setAllCoursesFullObject(fullObject);

                // 2. Live Classes
                const liveClassesRef = ref(db, 'liveClasses');
                const liveClassesSnapshot = await get(liveClassesRef);
                setLiveClassesData(Object.values(liveClassesSnapshot.val() || {}));

                // 3. Blog Posts
                const blogPostsRef = ref(db, 'blogPosts');
                const blogPostsSnapshot = await get(blogPostsRef);
                const blogs = blogPostsSnapshot.val() || [];
                setBlogPostsData(blogs.filter(post => post !== null));



                // 5. Success Stories
                const storiesRef = ref(db, 'successStories');
                const storiesSnapshot = await get(storiesRef);
                setSuccessStoriesData(Object.values(storiesSnapshot.val() || {}));

                // 6. Community Events
                const communityEventsRef = ref(db, 'communityEvents');
                const communityEventsSnapshot = await get(communityEventsRef);
                setCommunityEventsData(Object.values(communityEventsSnapshot.val() || {}));

            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        fetchData();

        // No listeners to unsubscribe from for these static/one-time fetches
        return () => { };
    }, []);

    // Combine all values for the context
    const contextValue = {
        coursesData,            // Grouped (for Category & Header)
        allCoursesFlatList,     // Flat Array (for SearchPage)
        allCoursesFullObject,   // Flat Object Map (for details/enrolled pages)

        liveClassesData,
        blogPostsData,
        instructorApplications,
        successStoriesData,
        communityEventsData,
    };

    return (
        <CourseContext.Provider value={contextValue}>
            {children}
        </CourseContext.Provider>
    );
};
