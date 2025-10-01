// src/pages/admin/BlogManagement.jsx

import React, { useState, useEffect } from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { db, storage } from '../../firebase';
import { ref, onValue, set, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const BlogManagement = (props) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentPostData, setCurrentPostData] = useState(null);

    const [isUploading, setIsUploading] = useState(false);
    const [imageInputMethod, setImageInputMethod] = useState('upload');

    const categories = ["Development", "Design", "Marketing", "Business"];

    useEffect(() => {
        const blogPostsRef = ref(db, 'blogPosts/');
        const unsubscribe = onValue(blogPostsRef, (snapshot) => {
            const data = snapshot.val();
            const loadedPosts = data ? data.filter(post => post !== null) : [];
            setBlogPosts(loadedPosts);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openModal = (mode, post = null) => {
        setModalMode(mode);
        setImageInputMethod('upload'); // Reset on open
        if (mode === 'add') {
            setCurrentPostData({
                title: '', author: '', category: categories[0], image: '',
                summary: '', content: ''
            });
        } else {
            setCurrentPostData(post);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentPostData(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentPostData(prevState => ({ ...prevState, [name]: value }));
    };
    
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const imageRef = storageRef(storage, `blog_images/${Date.now()}_${file.name}`);
        try {
            const snapshot = await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setCurrentPostData(prevState => ({ ...prevState, image: downloadURL }));
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!currentPostData.title || !currentPostData.author || !currentPostData.summary || !currentPostData.content) {
            alert("Please fill out all fields.");
            return;
        }

        const allPosts = [...blogPosts];

        if (modalMode === 'add') {
            const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const newPostId = allPosts.length > 0 ? Math.max(...allPosts.map(p => Number(p.id))) + 1 : 1;

            const newPost = {
                ...currentPostData,
                id: String(newPostId),
                date: currentDate,
            };
            
            const finalPostsArray = [null, ...allPosts, newPost];

            try {
                await set(ref(db, 'blogPosts'), finalPostsArray);
                alert('Blog post created successfully!');
                closeModal();
            } catch (error) {
                alert(`Error creating post: ${error.message}`);
            }

        } else {
            const postIndex = allPosts.findIndex(p => p.id === currentPostData.id);
            if (postIndex === -1) {
                alert("Could not find post to update.");
                return;
            }
            allPosts[postIndex] = currentPostData;
            const finalPostsArray = [null, ...allPosts];
            
            try {
                await set(ref(db, 'blogPosts'), finalPostsArray);
                alert('Blog post updated successfully!');
                closeModal();
            } catch (error) {
                alert(`Error updating post: ${error.message}`);
            }
        }
    };

    const handleDeletePost = async (postId, postTitle) => {
        if (window.confirm(`Are you sure you want to delete the post "${postTitle}"?`)) {
            try {
                const newPostsArray = blogPosts.filter(p => p.id !== postId);
                const finalPostsArray = [null, ...newPostsArray];
                
                await set(ref(db, 'blogPosts'), finalPostsArray);
                alert('Post deleted successfully.');
            } catch (error) {
                alert(`Error deleting post: ${error.message}`);
            }
        }
    };

    return (
        <AdminDashboardTemplate {...props} title="Blog Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Blog Posts</h2>
                    <button onClick={() => openModal('add')} className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Add New Post
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Title</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Author</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Category</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading posts...</td></tr>
                            ) : (
                                blogPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{post.title}</td>
                                        <td className="py-3 px-4 border-b">{post.author}</td>
                                        <td className="py-3 px-4 border-b">{post.category}</td>
                                        <td className="py-3 px-4 border-b">
                                            <button onClick={() => openModal('edit', post)} className="text-purple-600 hover:underline font-semibold">Edit</button>
                                            <button onClick={() => handleDeletePost(post.id, post.title)} className="text-red-600 hover:underline font-semibold ml-4">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6">{modalMode === 'add' ? 'Add New Post' : 'Edit Post'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                                <input type="text" name="title" placeholder="Post Title" value={currentPostData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="author" placeholder="Author Name" value={currentPostData.author} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                                    <select name="category" value={currentPostData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white">
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Post Image</label>
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
                                        <input type="text" name="image" value={currentPostData.image || ''} onChange={handleInputChange} placeholder="https://example.com/image.png" className="w-full p-2 border rounded-md" />
                                    )}
                                    {currentPostData.image && <img src={currentPostData.image} alt="Preview" className="w-32 h-auto object-cover rounded-lg mt-2 border"/>}
                                </div>
                                <textarea name="summary" placeholder="Post Summary (a short introduction)" value={currentPostData.summary} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-24" required />
                                <textarea name="content" placeholder="Full post content (Markdown is supported)" value={currentPostData.content} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg h-48" required />
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={closeModal} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">
                                    {modalMode === 'add' ? 'Create Post' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                 </div>
            )}
        </AdminDashboardTemplate>
    );
};

export default BlogManagement;