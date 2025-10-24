import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';
import AdminDashboardTemplate from './AdminDashboardTemplate';

// Helper for generating a unique ID based on a string
const slugify = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};

const CommunityEventsManagement = (props) => {
    const { events } = props;
    const [isEditing, setIsEditing] = useState(false); // Controls form visibility/mode
    const [formData, setFormData] = useState({ 
        id: '', 
        title: '', 
        date: '', 
        time: '', 
        description: '', 
        type: 'Online',
        link: ''
    });

    const handleEdit = (event) => {
        setFormData(event);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        // FIX 1: Set isEditing to true to show the form. ID is empty for new entry.
        setFormData({ id: '', title: '', date: '', time: '', description: '', type: 'Online', link: '' });
        setIsEditing(true); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Auto-generate ID if it's a new entry and the title changes
        if (!formData.id && name === 'title') {
            setFormData(prev => ({ ...prev, id: slugify(value) }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Ensure a valid ID is present before saving
        const finalId = formData.id || slugify(formData.title) || `event-${Date.now().toString().slice(-8)}`;
        const eventRef = ref(db, `communityEvents/${finalId}`);
        
        try {
            await set(eventRef, { ...formData, id: finalId });
            alert(`Event ${isEditing && events.some(e => e.id === finalId) ? 'updated' : 'created'} successfully!`);
            setIsEditing(false);
            setFormData({ id: '', title: '', date: '', time: '', description: '', type: 'Online', link: '' }); // Reset form
        } catch (error) {
            console.error("Error saving event:", error);
            alert(`Error saving event: ${error.message}`);
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this community event?")) {
            const eventRef = ref(db, `communityEvents/${eventId}`);
            try {
                await set(eventRef, null);
                alert("Event deleted successfully!");
            } catch (error) {
                console.error("Error deleting event:", error);
                alert(`Error deleting event: ${error.message}`);
            }
        }
    };

    return (
        <AdminDashboardTemplate {...props} title="Community Events Management">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Total Events: {events.length}</h2>
                    <button 
                        onClick={handleCreateNew} 
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        + Add New Event
                    </button>
                </div>

                {/* FIX 2: Check only if isEditing is true to display the form */}
                {isEditing && (
                    <div className="border border-gray-200 p-6 rounded-lg mb-8 bg-gray-50">
                        <h3 className="text-lg font-bold mb-4">{formData.id ? `Edit Event: ${formData.title}` : 'Create New Event'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Unique ID (Editable only for new entries)</label>
                                    <input 
                                        type="text" 
                                        name="id" 
                                        value={formData.id} 
                                        onChange={handleInputChange} 
                                        readOnly={!!formData.id} // Read-only if ID exists (i.e., editing)
                                        className={`w-full p-2 border rounded-md ${formData.id ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date/Frequency</label>
                                    <input type="text" name="date" value={formData.date} onChange={handleInputChange} required placeholder="e.g., Every Wednesday" className="w-full p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Time</label>
                                    <input type="text" name="time" value={formData.time} onChange={handleInputChange} required placeholder="e.g., 7:00 PM EST" className="w-full p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white" required>
                                        <option value="Online">Online</option>
                                        <option value="In-Person">In-Person</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Link/URL</label>
                                <input type="url" name="link" value={formData.link} onChange={handleInputChange} placeholder="Meeting or Registration Link" className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required className="w-full p-2 border rounded-md"></textarea>
                            </div>
                            <div className="flex space-x-4">
                                <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700">
                                    {formData.id ? 'Save Changes' : 'Create Event'}
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                
                {/* Events List */}
                <div className="space-y-4">
                    {(events || []).map(event => (
                        <div key={event.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg border">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="font-semibold">{event.title} <span className="px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded-full">{event.type}</span></p>
                                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 text-sm">View Link</a>
                                <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                                <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminDashboardTemplate>
    );
};

export default CommunityEventsManagement;