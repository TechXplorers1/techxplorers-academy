// src/pages/instructor/InstructorDashboard.jsx

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { db, storage } from '../../firebase';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// A Self-Contained, Full-Featured Editor Component for a Single Course
const CourseEditor = ({ course, onSave, onCancel, user }) => {
    const [courseData, setCourseData] = useState(JSON.parse(JSON.stringify(course))); 
    const [isUploading, setIsUploading] = useState(false);
    const [imageInputMethod, setImageInputMethod] = useState('upload');
    const [modalContent, setModalContent] = useState({ type: null, mode: 'add', data: {}, indices: {} });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!courseData.id && user?.name) {
            setCourseData(prev => ({...prev, instructor: user.name}));
        }
    }, [user, courseData.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const imageRef = storageRef(storage, `course_images/${Date.now()}_${file.name}`);
        try {
            const snapshot = await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setCourseData(prev => ({ ...prev, image: downloadURL }));
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert("Error uploading image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveChanges = () => onSave(courseData);

    const openModal = (type, mode, data = {}, indices = {}) => {
        setModalContent({ type, mode, data: JSON.parse(JSON.stringify(data)), indices });
        setIsModalOpen(true);
    };
    
    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setModalContent(prev => ({...prev, data: {...prev.data, [name]: value}}));
    };
    
    const handleModalFormSubmit = (e) => {
        e.preventDefault();
        const { type, mode, data, indices } = modalContent;
        const updatedCourse = { ...courseData };

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
                if (mode === 'add') updatedCourse.modules[indices.moduleIndex].lessons.push({ ...data, id: `lesson_${Date.now()}` });
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
            default: break;
        }
        setCourseData(updatedCourse);
        setIsModalOpen(false);
    };
    
    const handleDeleteItem = (type, indices) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        const updatedCourse = { ...courseData };
        if (type === 'module') updatedCourse.modules.splice(indices.moduleIndex, 1);
        else if (type === 'lesson') updatedCourse.modules[indices.moduleIndex].lessons.splice(indices.lessonIndex, 1);
        else if (type === 'outcome') updatedCourse.learningOutcomes.splice(indices.outcomeIndex, 1);
        else if (type === 'mentor') updatedCourse.mentors.splice(indices.mentorIndex, 1);
        setCourseData(updatedCourse);
    };

    const categories = ["Product & Strategy", "UX & UI Design", "Engineering & Development", "Data & Analytics", "Cybersecurity & Compliance", "AI & Automation", "Marketing", "Free Stacks"];

    return (
        <div className="border border-purple-200 bg-purple-50 p-6 rounded-lg mt-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Basic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                        <div className="flex items-center space-x-2 mb-2">
                            <button type="button" onClick={() => setImageInputMethod('upload')} className={`text-xs px-3 py-1 rounded-full ${imageInputMethod === 'upload' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Upload</button>
                            <button type="button" onClick={() => setImageInputMethod('url')} className={`text-xs px-3 py-1 rounded-full ${imageInputMethod === 'url' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>URL</button>
                        </div>
                        {imageInputMethod === 'upload' ? (
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/>
                                {isUploading && <p className="text-sm text-purple-600 mt-1">Uploading...</p>}
                            </div>
                        ) : (
                            <input type="text" name="image" value={courseData.image || ''} onChange={handleInputChange} placeholder="https://example.com/image.png" className="w-full p-2 border rounded-md" />
                        )}
                        {courseData.image && <img src={courseData.image} alt="Course preview" className="w-full h-auto object-cover rounded-lg mt-2 border"/>}
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input type="text" name="title" value={courseData.title} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" value={courseData.category} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input type="number" name="price" value={courseData.price} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Instructor</label>
                            <input type="text" name="instructor" value={courseData.instructor} className="w-full p-2 border rounded-md bg-gray-100" readOnly />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={courseData.description} onChange={handleInputChange} className="w-full p-2 border rounded-md h-24" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Learning Outcomes</h3>
                    <button onClick={() => openModal('outcome', 'add', { text: '' })} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">Add Outcome</button>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                    {(courseData.learningOutcomes || []).map((outcome, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <span>{outcome}</span>
                            <div className="space-x-4">
                                <button onClick={() => openModal('outcome', 'edit', { text: outcome }, { outcomeIndex: index })} className="text-purple-600 font-semibold hover:underline">Edit</button>
                                <button onClick={() => handleDeleteItem('outcome', { outcomeIndex: index })} className="text-red-600 font-semibold hover:underline">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Mentors</h3>
                    <button onClick={() => openModal('mentor', 'add', { name: '', title: '', image: '' })} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">Add Mentor</button>
                </div>
                <div className="space-y-3">
                    {(courseData.mentors || []).map((mentor, index) => (
                         <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <img src={mentor.image || 'https://placehold.co/100x100'} alt={mentor.name} className="w-10 h-10 rounded-full mr-4" />
                                <div>
                                    <p className="font-semibold">{mentor.name}</p>
                                    <p className="text-xs text-gray-600">{mentor.title}</p>
                                </div>
                            </div>
                            <div className="space-x-4">
                                <button onClick={() => openModal('mentor', 'edit', mentor, { mentorIndex: index })} className="text-purple-600 font-semibold hover:underline">Edit</button>
                                <button onClick={() => handleDeleteItem('mentor', { mentorIndex: index })} className="text-red-600 font-semibold hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Modules & Lessons</h3>
                    <button onClick={() => openModal('module', 'add', { title: '' })} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">Add Module</button>
                </div>
                <div className="space-y-4">
                    {(courseData.modules || []).map((module, moduleIndex) => (
                        <div key={moduleIndex} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-lg text-gray-700">{module.title}</h4>
                                <div className="space-x-4">
                                    <button onClick={() => openModal('module', 'edit', module, { moduleIndex })} className="text-purple-600 font-semibold hover:underline">Edit Title</button>
                                    <button onClick={() => handleDeleteItem('module', { moduleIndex })} className="text-red-600 font-semibold hover:underline">Delete Module</button>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {(module.lessons || []).map((lesson, lessonIndex) => (
                                    <li key={lesson.id || lessonIndex} className="flex justify-between items-center p-3 bg-white rounded-md border">
                                        <div><p className="font-semibold">{lesson.title}</p></div>
                                        <div className="space-x-4">
                                            <button onClick={() => openModal('lesson', 'edit', lesson, { moduleIndex, lessonIndex })} className="text-purple-600 font-semibold hover:underline">Edit</button>
                                            <button onClick={() => handleDeleteItem('lesson', { moduleIndex, lessonIndex })} className="text-red-600 font-semibold hover:underline">Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => openModal('lesson', 'add', { title: '', videoUrl: '' }, { moduleIndex })} className="mt-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600">Add Lesson</button>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={onCancel} className="px-6 py-2 bg-gray-200 font-semibold rounded-full hover:bg-gray-300">Cancel</button>
                <button onClick={handleSaveChanges} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700">Save All Changes</button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">{`${modalContent.mode === 'add' ? 'Add' : 'Edit'} ${modalContent.type.charAt(0).toUpperCase() + modalContent.type.slice(1)}`}</h2>
                        <form onSubmit={handleModalFormSubmit} className="space-y-4">
                            {modalContent.type === 'outcome' && <textarea name="text" value={modalContent.data.text || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg h-24" autoFocus/>}
                            {modalContent.type === 'mentor' && <>
                                <input type="text" name="name" placeholder="Mentor Name" value={modalContent.data.name || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg" required autoFocus/>
                                <input type="text" name="title" placeholder="Mentor Title" value={modalContent.data.title || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg" required />
                                <input type="text" name="image" placeholder="Image URL" value={modalContent.data.image || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg" />
                            </>}
                            {modalContent.type === 'module' && <input type="text" name="title" placeholder="Module Title" value={modalContent.data.title || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg" required autoFocus/>}
                            {modalContent.type === 'lesson' && <>
                                <input type="text" name="title" placeholder="Lesson Title" value={modalContent.data.title || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg" required autoFocus/>
                                <input type="text" name="videoUrl" placeholder="Video URL" value={modalContent.data.videoUrl || ''} onChange={handleModalInputChange} className="w-full p-2 border rounded-lg" required />
                            </>}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const LiveClassEditor = ({ liveClass, onSave, onCancel, user }) => {
    const [classData, setClassData] = useState(JSON.parse(JSON.stringify(liveClass)));
    const [isUploading, setIsUploading] = useState(false);
    const [imageInputMethod, setImageInputMethod] = useState('upload');
    const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
    const [recordingModalContent, setRecordingModalContent] = useState({ mode: 'add', data: {}, index: -1 });

    useEffect(() => {
        if (!classData.id && user?.name) {
            setClassData(prev => ({...prev, instructor: user.name}));
        }
    }, [user, classData.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const imageRef = storageRef(storage, `liveclass_images/${Date.now()}_${file.name}`);
        try {
            const snapshot = await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setClassData(prev => ({ ...prev, image: downloadURL }));
        } catch (error) {
            alert("Error uploading image.");
        } finally {
            setIsUploading(false);
        }
    };

    const openRecordingModal = (mode, data = { title: '', videoUrl: '' }, index = -1) => {
        setRecordingModalContent({ mode, data, index });
        setIsRecordingModalOpen(true);
    };

    const handleRecordingSave = (recordingData) => {
        const updatedRecordings = [...(classData.recordings || [])];
        if (recordingModalContent.mode === 'add') {
            updatedRecordings.push({ ...recordingData, id: `rec_${Date.now()}` });
        } else {
            updatedRecordings[recordingModalContent.index] = recordingData;
        }
        setClassData(prev => ({ ...prev, recordings: updatedRecordings }));
        setIsRecordingModalOpen(false);
    };

    const handleRecordingDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this recording?')) {
            const updatedRecordings = [...classData.recordings];
            updatedRecordings.splice(index, 1);
            setClassData(prev => ({ ...prev, recordings: updatedRecordings }));
        }
    };

    return (
        <div className="border border-blue-200 bg-blue-50 p-6 rounded-lg mt-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Live Class Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class Image</label>
                        <div className="flex items-center space-x-2 mb-2">
                            <button type="button" onClick={() => setImageInputMethod('upload')} className={`text-xs px-3 py-1 rounded-full ${imageInputMethod === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Upload</button>
                            <button type="button" onClick={() => setImageInputMethod('url')} className={`text-xs px-3 py-1 rounded-full ${imageInputMethod === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>URL</button>
                        </div>
                        {imageInputMethod === 'upload' ? (
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                {isUploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                            </div>
                        ) : (
                            <input type="text" name="image" value={classData.image || ''} onChange={handleInputChange} placeholder="https://example.com/image.png" className="w-full p-2 border rounded-md" />
                        )}
                        {classData.image && <img src={classData.image} alt="Class preview" className="w-full h-auto object-cover rounded-lg mt-2 border"/>}
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" value={classData.title} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Instructor</label>
                            <input type="text" name="instructor" value={classData.instructor} className="w-full p-2 border rounded-md bg-gray-100" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="text" name="date" value={classData.date} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="e.g., October 28, 2025" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input type="text" name="time" value={classData.time} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="e.g., 10:00 AM EST" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input type="number" name="price" value={classData.price} onChange={handleInputChange} className="w-full p-2 border rounded-md" step="0.01" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={classData.description} onChange={handleInputChange} className="w-full p-2 border rounded-md h-24" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Recordings</h3>
                    <button onClick={() => openRecordingModal('add')} className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600">Add Recording</button>
                </div>
                <div className="space-y-2">
                    {(classData.recordings || []).map((rec, index) => (
                        <div key={rec.id || index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <p className="font-semibold text-sm">{rec.title}</p>
                            <div className="space-x-4">
                                <button onClick={() => openRecordingModal('edit', rec, index)} className="text-purple-600 font-semibold hover:underline text-sm">Edit</button>
                                <button onClick={() => handleRecordingDelete(index)} className="text-red-600 font-semibold hover:underline text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
                <button onClick={onCancel} className="px-6 py-2 bg-gray-200 font-semibold rounded-full hover:bg-gray-300">Cancel</button>
                <button onClick={() => onSave(classData)} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700">Save Changes</button>
            </div>

            {isRecordingModalOpen && <RecordingModal content={recordingModalContent} onSave={handleRecordingSave} onClose={() => setIsRecordingModalOpen(false)} />}
        </div>
    );
};

const RecordingModal = ({ content, onSave, onClose }) => {
    const [data, setData] = useState(content.data);
    const handleChange = (e) => setData(prev => ({...prev, [e.target.name]: e.target.value}));
    const handleSubmit = (e) => { e.preventDefault(); onSave(data); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{content.mode === 'add' ? 'Add Recording' : 'Edit Recording'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="Recording Title" className="w-full px-4 py-2 border rounded-lg" required autoFocus />
                    <input type="text" name="videoUrl" value={data.videoUrl} onChange={handleChange} placeholder="Video URL" className="w-full px-4 py-2 border rounded-lg" required />
                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InstructorDashboard = (props) => {
    const { user } = props;
    const [myCourses, setMyCourses] = useState([]);
    const [myLiveClasses, setMyLiveClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('courses');
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [isAddingNewCourse, setIsAddingNewCourse] = useState(false);
    const [editingLiveClassId, setEditingLiveClassId] = useState(null);
    const [isAddingNewLiveClass, setIsAddingNewLiveClass] = useState(false);

    useEffect(() => {
        if (!user?.name) { setIsLoading(false); return; }
        const coursesRef = ref(db, 'courses');
        const liveClassesRef = ref(db, 'liveClasses');
        
        const unsubCourses = onValue(coursesRef, snap => {
            const data = snap.val() || {};
            setMyCourses(Object.values(data).filter(c => c.instructor === user.name));
        });
        const unsubLiveClasses = onValue(liveClassesRef, snap => {
            const data = snap.val() || {};
            setMyLiveClasses(Object.values(data).filter(c => c.instructor === user.name));
        });

        setIsLoading(false);
        return () => { unsubCourses(); unsubLiveClasses(); };
    }, [user?.name]);

    const handleSaveCourse = async (courseData) => {
        try {
            if (isAddingNewCourse) {
                const newCourseRef = push(ref(db, 'courses'));
                courseData.id = newCourseRef.key;
                await set(newCourseRef, courseData);
                alert('Course created successfully!');
                setIsAddingNewCourse(false);
            } else {
                const { id, ...dataToSave } = courseData;
                await update(ref(db, `courses/${id}`), dataToSave);
                alert("Course updated successfully!");
                setEditingCourseId(null);
            }
        } catch (error) {
            alert(`Error saving course: ${error.message}`);
        }
    };
    
    const handleDeleteCourse = async (courseId, courseTitle) => {
        if (window.confirm(`Are you sure you want to PERMANENTLY DELETE "${courseTitle}"?`)) {
            await remove(ref(db, 'courses/' + courseId));
            alert('Course deleted.');
        }
    };
    
    const handleSaveLiveClass = async (classData) => {
        try {
            if (isAddingNewLiveClass) {
                const newClassRef = push(ref(db, 'liveClasses'));
                classData.id = newClassRef.key;
                await set(newClassRef, classData);
                alert('Live class scheduled successfully!');
                setIsAddingNewLiveClass(false);
            } else {
                const { id, ...dataToSave } = classData;
                await update(ref(db, `liveClasses/${id}`), dataToSave);
                alert("Live class updated successfully!");
                setEditingLiveClassId(null);
            }
        } catch (error) {
            alert(`Error saving live class: ${error.message}`);
        }
    };

    const handleDeleteLiveClass = async (classId, classTitle) => {
        if (window.confirm(`Are you sure you want to delete "${classTitle}"?`)) {
            await remove(ref(db, `liveClasses/${classId}`));
            alert('Live class deleted.');
        }
    };

    const newCourseTemplate = { title: '', category: 'Product & Strategy', price: 0, description: '', image: '', instructor: user?.name, modules: [], learningOutcomes: [], mentors: [] };
    const newLiveClassTemplate = { title: '', date: '', time: '', price: 0, description: '', image: '', instructor: user?.name, recordings: [] };

    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            <Header {...props} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user?.name || 'Instructor'}!</p>
                </div>

                <div className="flex border-b mb-6">
                    <button onClick={() => setActiveTab('courses')} className={`py-2 px-4 font-semibold ${activeTab === 'courses' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}>My Courses</button>
                    <button onClick={() => setActiveTab('liveClasses')} className={`py-2 px-4 font-semibold ${activeTab === 'liveClasses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>My Live Classes</button>
                </div>

                {isLoading ? <p>Loading your data...</p> : (
                    <>
                        {activeTab === 'courses' && (
                            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-800">Your Created Courses</h2>
                                    <button onClick={() => setIsAddingNewCourse(true)} className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700">Create New Course</button>
                                </div>
                                {isAddingNewCourse && <CourseEditor course={newCourseTemplate} onSave={handleSaveCourse} onCancel={() => setIsAddingNewCourse(false)} user={user} />}
                                {myCourses.map(course => (
                                    <div key={course.id} className="border rounded-lg">
                                        <div className="flex items-center justify-between p-4 bg-gray-50">
                                            <p className="font-bold text-gray-800">{course.title}</p>
                                            <div className="space-x-2">
                                                <button onClick={() => editingCourseId === course.id ? setEditingCourseId(null) : setEditingCourseId(course.id)} className="px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
                                                    {editingCourseId === course.id ? 'Close' : 'Edit'}
                                                </button>
                                                <button onClick={() => handleDeleteCourse(course.id, course.title)} className="px-4 py-2 text-sm font-semibold bg-red-100 text-red-700 rounded-full hover:bg-red-200">Delete</button>
                                            </div>
                                        </div>
                                        {editingCourseId === course.id && <CourseEditor course={course} onSave={handleSaveCourse} onCancel={() => setEditingCourseId(null)} user={user} />}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'liveClasses' && (
                             <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-800">Your Scheduled Live Classes</h2>
                                    <button onClick={() => setIsAddingNewLiveClass(true)} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700">Schedule New Class</button>
                                </div>
                                {isAddingNewLiveClass && <LiveClassEditor liveClass={newLiveClassTemplate} onSave={handleSaveLiveClass} onCancel={() => setIsAddingNewLiveClass(false)} user={user} />}
                                {myLiveClasses.map(cls => (
                                    <div key={cls.id} className="border rounded-lg">
                                        <div className="flex items-center justify-between p-4 bg-gray-50">
                                            <div><p className="font-bold">{cls.title}</p><p className="text-sm text-gray-500">{cls.date}</p></div>
                                            <div className="space-x-2">
                                                <button onClick={() => editingLiveClassId === cls.id ? setEditingLiveClassId(null) : setEditingLiveClassId(cls.id)} className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                                                    {editingLiveClassId === cls.id ? 'Close' : 'Edit'}
                                                </button>
                                                <button onClick={() => handleDeleteLiveClass(cls.id, cls.title)} className="px-4 py-2 text-sm font-semibold bg-red-100 text-red-700 rounded-full hover:bg-red-200">Delete</button>
                                            </div>
                                        </div>
                                        {editingLiveClassId === cls.id && <LiveClassEditor liveClass={cls} onSave={handleSaveLiveClass} onCancel={() => setEditingLiveClassId(null)} user={user} />}
                                    </div>
                                ))}
                             </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default InstructorDashboard;