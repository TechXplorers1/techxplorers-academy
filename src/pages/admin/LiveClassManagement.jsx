// src/pages/admin/LiveClassManagement.jsx

import React, { useState, useEffect } from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { db, storage } from '../../firebase';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const LiveClassEditor = ({ liveClass, onSave, onCancel }) => {
    const [classData, setClassData] = useState(JSON.parse(JSON.stringify(liveClass)));
    const [isUploading, setIsUploading] = useState(false);
    const [imageInputMethod, setImageInputMethod] = useState('upload');
    const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
    const [recordingModalContent, setRecordingModalContent] = useState({ mode: 'add', data: {}, index: -1 });

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
            console.error("Error uploading image: ", error);
            alert("Error uploading image. Please try again.");
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
        <div className="border border-purple-200 bg-purple-50 p-6 rounded-lg mt-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Class Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class Image</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                            <input type="text" name="instructor" value={classData.instructor} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
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
                <button onClick={() => onSave(classData)} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700">Save All Changes</button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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

const LiveClassManagement = (props) => {
    const [liveClasses, setLiveClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingClassId, setEditingClassId] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        const liveClassesRef = ref(db, 'liveClasses/');
        const unsubscribe = onValue(liveClassesRef, (snapshot) => {
            const data = snapshot.val();
            setLiveClasses(data ? Object.values(data) : []);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async (classData) => {
        try {
            if (isAddingNew) {
                const newClassRef = push(ref(db, 'liveClasses'));
                classData.id = newClassRef.key;
                await set(newClassRef, classData);
                alert('Live class scheduled successfully!');
                setIsAddingNew(false);
            } else {
                const classRef = ref(db, `liveClasses/${classData.id}`);
                await update(classRef, classData);
                alert('Live class updated successfully!');
                setEditingClassId(null);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleDelete = async (classId, classTitle) => {
        if (window.confirm(`Are you sure you want to delete "${classTitle}"?`)) {
            await remove(ref(db, `liveClasses/${classId}`));
            alert('Live class deleted.');
        }
    };

    const newClassTemplate = { title: '', instructor: '', date: '', time: '', description: '', price: 0, image: '', recordings: [] };

    return (
        <AdminDashboardTemplate {...props} title="Live Class Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Live Classes</h2>
                    <button onClick={() => setIsAddingNew(true)} className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">
                        Schedule New Class
                    </button>
                </div>
                
                {isAddingNew && (
                    <div className="mb-6"><LiveClassEditor liveClass={newClassTemplate} onSave={handleSave} onCancel={() => setIsAddingNew(false)} /></div>
                )}

                {isLoading ? <p>Loading...</p> : (
                    <div className="space-y-4">
                        {liveClasses.map(cls => (
                             <div key={cls.id} className="border rounded-lg transition-shadow duration-300 hover:shadow-md">
                                <div className="flex items-center justify-between p-4 bg-gray-50">
                                    <div>
                                        <p className="font-bold text-gray-800">{cls.title}</p>
                                        <p className="text-sm text-gray-500">{cls.instructor} - {cls.date}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => editingClassId === cls.id ? setEditingClassId(null) : setEditingClassId(cls.id)} className="px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
                                            {editingClassId === cls.id ? 'Close' : 'Edit'}
                                        </button>
                                        <button onClick={() => handleDelete(cls.id, cls.title)} className="px-4 py-2 text-sm font-semibold bg-red-100 text-red-700 rounded-full hover:bg-red-200">Delete</button>
                                    </div>
                                </div>
                                {editingClassId === cls.id && (
                                    <LiveClassEditor liveClass={cls} onSave={handleSave} onCancel={() => setEditingClassId(null)} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminDashboardTemplate>
    );
};

export default LiveClassManagement;