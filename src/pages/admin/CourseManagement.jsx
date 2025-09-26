import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { db } from '../../firebase';
import { ref, onValue, push, set, update, remove } from 'firebase/database';

const CourseManagement = (props) => {
    const [coursesList, setCoursesList] = useState([]);
    const [groupedCourses, setGroupedCourses] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourseData, setNewCourseData] = useState(null);
    
    // NEW: State to track which category is open
    const [openCategory, setOpenCategory] = useState(null);

    const categories = [
        "Product & Strategy", "UX & UI Design", "Engineering & Development", 
        "Data & Analytics", "Cybersecurity & Compliance", "AI & Automation", 
        "Marketing", "Free Stacks"
    ];

    useEffect(() => {
        const coursesRef = ref(db, 'courses/');
        const unsubscribe = onValue(coursesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedCourses = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setCoursesList(loadedCourses);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const groupBy = (array, key) => {
            return array.reduce((result, currentValue) => {
                const groupKey = currentValue[key] || 'Uncategorized';
                (result[groupKey] = result[groupKey] || []).push(currentValue);
                return result;
            }, {});
        };

        if (coursesList.length > 0) {
            const grouped = groupBy(coursesList, 'category');
            setGroupedCourses(grouped);
        }
    }, [coursesList]);

    // NEW: Handler to toggle the open/closed state of a category
    const handleCategoryToggle = (category) => {
        setOpenCategory(prevOpenCategory => prevOpenCategory === category ? null : category);
    };

    // --- Modal and Form Handlers (No changes needed) ---
    const openAddModal = () => {
        setNewCourseData({
            title: '', category: categories[0], price: 0, instructor: '',
            description: '', image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=New+Course'
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewCourseData(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourseData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddCourseSubmit = async (e) => {
        e.preventDefault();
        const newCourseRef = push(ref(db, 'courses'));
        try {
            await set(newCourseRef, {
                ...newCourseData,
                price: Number(newCourseData.price),
                id: newCourseRef.key,
                rating: 0, reviews: 0, totalLessons: 0, modules: [],
                mentors: [], learningOutcomes: [], curriculum: []
            });
            alert('Course created successfully!');
            closeModal();
        } catch (error) {
            alert(`Error creating course: ${error.message}`);
        }
    };

    const handleDeleteCourse = async (courseId, courseTitle) => {
        if (window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
            const courseRef = ref(db, 'courses/' + courseId);
            try {
                await remove(courseRef);
                alert('Course deleted successfully.');
            } catch (error) {
                alert(`Error deleting course: ${error.message}`);
            }
        }
    };

    return (
        <AdminDashboardTemplate {...props} title="Course Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
                    <button onClick={openAddModal} className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Add New Course
                    </button>
                </div>

                {/* UPDATED: Accordion Layout for Categories */}
                <div className="space-y-2">
                    {isLoading ? (
                        <p>Loading Courses...</p>
                    ) : (
                        Object.keys(groupedCourses).sort().map(category => (
                            <div key={category} className="border-b border-gray-200 last:border-b-0">
                                <button
                                    onClick={() => handleCategoryToggle(category)}
                                    className="w-full flex justify-between items-center py-4 px-2 text-left hover:bg-gray-50 focus:outline-none"
                                >
                                    <h3 className="text-xl font-bold text-gray-700">{category}</h3>
                                    <svg 
                                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openCategory === category ? 'rotate-180' : 'rotate-0'}`} 
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openCategory === category && (
                                    <div className="pb-4 px-2 space-y-2">
                                        {groupedCourses[category].map(course => (
                                            <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-semibold text-gray-800">{course.title}</p>
                                                    <p className="text-sm text-gray-500">${Number(course.price).toFixed(2)}</p>
                                                </div>
                                                <div>
                                                    <Link to={`/admin/courses/edit/${course.id}`} className="text-purple-600 hover:underline font-semibold text-sm">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDeleteCourse(course.id, course.title)} className="text-red-600 hover:underline font-semibold ml-4 text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {/* Modal for ADDING a new course (No changes) */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">Add New Course</h2>
                        <form onSubmit={handleAddCourseSubmit}>
                            <div className="space-y-4">
                                <input type="text" name="title" placeholder="Course Title" value={newCourseData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                <select name="category" value={newCourseData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                <input type="number" name="price" placeholder="Price" value={newCourseData.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required step="0.01" />
                                <input type="text" name="instructor" placeholder="Instructor Name" value={newCourseData.instructor} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                                <textarea name="description" placeholder="Course Description" value={newCourseData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-24" />
                                <input type="text" name="image" placeholder="Image URL" value={newCourseData.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={closeModal} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                 </div>
            )}
        </AdminDashboardTemplate>
    );
};

export default CourseManagement;