import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const EditCourseDetails = (props) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ type: null, mode: 'add', data: {}, indices: {} });

    const categories = [
        "Product & Strategy", "UX & UI Design", "Engineering & Development", 
        "Data & Analytics", "Cybersecurity & Compliance", "AI & Automation", 
        "Marketing", "Free Stacks"
    ];

    useEffect(() => {
        const courseRef = ref(db, `courses/${courseId}`);
        const unsubscribe = onValue(courseRef, (snapshot) => {
            if (snapshot.exists()) {
                setCourse({ id: courseId, ...snapshot.val() });
            } else {
                console.error("Course not found!");
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };
    
    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setModalContent(prev => ({ ...prev, data: { ...prev.data, [name]: value }}));
    };

    const handleSaveChanges = async () => {
        const courseRef = ref(db, `courses/${courseId}`);
        try {
            const { id, ...courseData } = course;
            await update(courseRef, courseData);
            alert('Course details saved successfully!');
        } catch (error) {
            alert(`Error saving changes: ${error.message}`);
        }
    };
    
    const openModal = (type, mode, data = {}, indices = {}) => {
        setModalContent({ type, mode, data, indices });
        setIsModalOpen(true);
    };
    
    const handleDeleteItem = (type, indices) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        const updatedCourse = JSON.parse(JSON.stringify(course));
        
        if (type === 'module') updatedCourse.modules.splice(indices.moduleIndex, 1);
        else if (type === 'lesson') updatedCourse.modules[indices.moduleIndex].lessons.splice(indices.lessonIndex, 1);
        else if (type === 'outcome') updatedCourse.learningOutcomes.splice(indices.outcomeIndex, 1);
        else if (type === 'mentor') updatedCourse.mentors.splice(indices.mentorIndex, 1);
        
        setCourse(updatedCourse);
    };

    const handleModalFormSubmit = (e) => {
        e.preventDefault();
        const { type, mode, data, indices } = modalContent;
        const updatedCourse = JSON.parse(JSON.stringify(course));

        if (!updatedCourse.modules) updatedCourse.modules = [];
        if (!updatedCourse.learningOutcomes) updatedCourse.learningOutcomes = [];
        if (!updatedCourse.mentors) updatedCourse.mentors = [];

        switch (type) {
            case 'module':
                if (mode === 'add') updatedCourse.modules.push({ title: data.title, lessons: [] });
                else updatedCourse.modules[indices.moduleIndex].title = data.title;
                break;
            case 'lesson':
                if (!updatedCourse.modules[indices.moduleIndex].lessons) updatedCourse.modules[indices.moduleIndex].lessons = [];
                if (mode === 'add') updatedCourse.modules[indices.moduleIndex].lessons.push(data);
                else updatedCourse.modules[indices.moduleIndex].lessons[indices.lessonIndex] = data;
                break;
            case 'outcome':
                if (mode === 'add') updatedCourse.learningOutcomes.push(data.text);
                else updatedCourse.learningOutcomes[indices.outcomeIndex] = data.text;
                break;
            case 'mentor':
                if (mode === 'add') updatedCourse.mentors.push(data);
                else updatedCourse.mentors[indices.mentorIndex] = data;
                break;
            default:
                break;
        }
        
        setCourse(updatedCourse);
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <AdminDashboardTemplate {...props} title="Loading..."><p>Loading course details...</p></AdminDashboardTemplate>;
    }
    if (!course) {
        return <AdminDashboardTemplate {...props} title="Error"><p>Course not found.</p></AdminDashboardTemplate>;
    }

    return (
        <AdminDashboardTemplate {...props} title={`Edit: ${course.title}`}>
            <div className="space-y-8">
                {/* --- Basic Details Card (Updated with Labels) --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input type="text" id="title" name="title" value={course.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select id="category" name="category" value={course.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input type="number" id="price" name="price" value={course.price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" step="0.01" />
                        </div>
                        <div>
                            <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                            <input type="text" id="instructor" name="instructor" value={course.instructor} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" name="description" value={course.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-24" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input type="text" id="image" name="image" value={course.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* --- Learning Outcomes Card --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Learning Outcomes</h3>
                        <button onClick={() => openModal('outcome', 'add', { text: '' })} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">Add Outcome</button>
                    </div>
                    <ul className="space-y-2 list-disc pl-5">
                        {(course.learningOutcomes || []).map((outcome, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{outcome}</span>
                                <div>
                                    <button onClick={() => openModal('outcome', 'edit', { text: outcome }, { outcomeIndex: index })} className="text-sm text-purple-600 font-semibold hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteItem('outcome', { outcomeIndex: index })} className="text-sm text-red-600 font-semibold hover:underline ml-4">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- Mentors Card --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Mentors</h3>
                        <button onClick={() => openModal('mentor', 'add', { name: '', title: '', image: '' })} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">Add Mentor</button>
                    </div>
                    <div className="space-y-3">
                        {(course.mentors || []).map((mentor, index) => (
                             <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <img src={mentor.image || 'https://placehold.co/100x100'} alt={mentor.name} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <p className="font-semibold">{mentor.name}</p>
                                        <p className="text-xs text-gray-600">{mentor.title}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => openModal('mentor', 'edit', mentor, { mentorIndex: index })} className="text-sm text-purple-600 font-semibold hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteItem('mentor', { mentorIndex: index })} className="text-sm text-red-600 font-semibold hover:underline ml-4">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Modules & Lessons Editor --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Modules & Lessons</h3>
                        <button onClick={() => openModal('module', 'add', { title: '' })} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">
                            Add New Module
                        </button>
                    </div>
                    <div className="space-y-4">
                        {(course.modules || []).map((module, moduleIndex) => (
                            <div key={moduleIndex} className="p-4 border rounded-lg bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold text-lg text-gray-700">{module.title}</h4>
                                    <div>
                                        <button onClick={() => openModal('module', 'edit', module, { moduleIndex })} className="text-sm text-purple-600 font-semibold hover:underline">Edit Title</button>
                                        <button onClick={() => handleDeleteItem('module', { moduleIndex })} className="text-sm text-red-600 font-semibold hover:underline ml-4">Delete Module</button>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {(module.lessons || []).map((lesson, lessonIndex) => (
                                        <li key={lessonIndex} className="flex justify-between items-center p-2 bg-white rounded-md border">
                                            <div>
                                                <p className="font-semibold">{lesson.title}</p>
                                                <p className="text-xs text-gray-500">{lesson.videoUrl}</p>
                                            </div>
                                            <div>
                                                <button onClick={() => openModal('lesson', 'edit', lesson, { moduleIndex, lessonIndex })} className="text-sm text-purple-600 font-semibold hover:underline">Edit</button>
                                                <button onClick={() => handleDeleteItem('lesson', { moduleIndex, lessonIndex })} className="text-sm text-red-600 font-semibold hover:underline ml-4">Delete</button>
                                            </div>
                                        </li>
                                    ))}
                                    {(!module.lessons || module.lessons.length === 0) && (
                                        <p className="text-xs text-gray-500 italic">No lessons in this module yet.</p>
                                    )}
                                </ul>
                                <button onClick={() => openModal('lesson', 'add', { title: '', videoUrl: '' }, { moduleIndex })} className="mt-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600">
                                    Add Lesson to this Module
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button onClick={handleSaveChanges} className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors">Save All Changes</button>
                </div>
            </div>

            {/* --- Reusable Modal for All Forms --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">{`${modalContent.mode === 'add' ? 'Add' : 'Edit'} ${modalContent.type.charAt(0).toUpperCase() + modalContent.type.slice(1)}`}</h2>
                        <form onSubmit={handleModalFormSubmit}>
                            <div className="space-y-4">
                                {modalContent.type === 'outcome' && (
                                    <textarea name="text" placeholder="Learning outcome text" value={modalContent.data.text || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg h-24" required />
                                )}
                                {modalContent.type === 'mentor' && <>
                                    <input type="text" name="name" placeholder="Mentor Name" value={modalContent.data.name || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                    <input type="text" name="title" placeholder="Mentor Title (e.g., Senior Developer)" value={modalContent.data.title || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                    <input type="text" name="image" placeholder="Image URL" value={modalContent.data.image || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg" />
                                </>}
                                {modalContent.type === 'module' && (
                                    <input type="text" name="title" placeholder="Module Title" value={modalContent.data.title || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                )}
                                {modalContent.type === 'lesson' && <>
                                    <input type="text" name="title" placeholder="Lesson Title" value={modalContent.data.title || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                    <input type="text" name="videoUrl" placeholder="Video URL" value={modalContent.data.videoUrl || ''} onChange={handleModalInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                </>}
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminDashboardTemplate>
    );
};

export default EditCourseDetails;