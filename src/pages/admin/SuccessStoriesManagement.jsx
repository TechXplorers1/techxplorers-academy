import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';
import AdminDashboardTemplate from './AdminDashboardTemplate';

// Helper for generating a simple ID (same logic as used in App.jsx for orders)
const generateId = () => 'story-' + Date.now().toString().slice(-8);

const SuccessStoriesManagement = (props) => {
    const { stories } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: generateId(), name: '', role: '', story: '', image: '' });

    const handleEdit = (story) => {
        setFormData(story);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setFormData({ id: generateId(), name: '', role: '', story: '', image: '' });
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const storyRef = ref(db, `successStories/${formData.id}`);
        
        try {
            await set(storyRef, formData);
            alert(`Story ${isEditing ? 'updated' : 'created'} successfully!`);
            setIsEditing(false);
            setFormData({ id: generateId(), name: '', role: '', story: '', image: '' }); // Reset form
        } catch (error) {
            console.error("Error saving story:", error);
            alert(`Error saving story: ${error.message}`);
        }
    };

    const handleDelete = async (storyId) => {
        if (window.confirm("Are you sure you want to delete this success story?")) {
            const storyRef = ref(db, `successStories/${storyId}`);
            try {
                await set(storyRef, null);
                alert("Story deleted successfully!");
            } catch (error) {
                console.error("Error deleting story:", error);
                alert(`Error deleting story: ${error.message}`);
            }
        }
    };

    return (
        <AdminDashboardTemplate {...props} title="Success Stories Management">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Total Stories: {stories.length}</h2>
                    <button 
                        onClick={handleCreateNew} 
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        + Add New Story
                    </button>
                </div>

                {isEditing && (
                    <div className="border border-gray-200 p-6 rounded-lg mb-8 bg-gray-50">
                        <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit Story' : 'Create New Story'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input type="hidden" name="id" value={formData.id} />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role/Job Title</label>
                                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full p-2 border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL (Placeholder)</label>
                                <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="e.g., https://placehold.co/100x100" className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Story/Testimonial</label>
                                <textarea name="story" value={formData.story} onChange={handleInputChange} rows="3" required className="w-full p-2 border rounded-md"></textarea>
                            </div>
                            <div className="flex space-x-4">
                                <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
                                    {isEditing ? 'Save Changes' : 'Create Story'}
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                
                {/* Stories List */}
                <div className="space-y-4">
                    {(stories || []).map(story => (
                        <div key={story.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg border">
                            <div className="flex items-center space-x-4">
                                <img src={story.image} alt={story.name} className="w-10 h-10 rounded-full object-cover"/>
                                <div>
                                    <p className="font-semibold">{story.name} <span className="text-sm text-gray-500">({story.role})</span></p>
                                    <p className="text-sm text-gray-600 truncate max-w-lg">{story.story}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(story)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                                <button onClick={() => handleDelete(story.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminDashboardTemplate>
    );
};

export default SuccessStoriesManagement;