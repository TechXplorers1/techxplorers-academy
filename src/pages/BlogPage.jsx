import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import ReactMarkdown from 'react-markdown';

const BlogPage = ({ isLoggedIn, onLogout, cartItemsCount, coursesData, blogPostsData }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogPostsData && blogPostsData.length > 0) {
            const foundPost = blogPostsData.find(p => p.id === id);
            setPost(foundPost);
            setLoading(false);
        } else if (blogPostsData) {
            setLoading(false);
        }
    }, [id, blogPostsData]);

    // CHANGED: Loading screen background to light theme
    if (loading) {
        return (
            <div className="bg-white text-gray-900 min-h-screen flex items-center justify-center">
                <p className="text-2xl">Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            // CHANGED: Background/text colors
            <div className="bg-white text-gray-900 min-h-screen">
                 <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} />
                 <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
                    <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
                    {/* CHANGED: Link color to blue-600 */}
                    <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                 </main>
                 <Footer />
            </div>
        );
    }

    return (
        // CHANGED: Background/text colors
        <div className="bg-gray-50 text-gray-900 min-h-screen font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    {/* CHANGED: Link color to blue-600 */}
                    <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    {/* CHANGED: Article background to white */}
                    <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-80 md:h-[400px] object-cover"
                        />
                        <div className="p-8 md:p-12">
                            {/* CHANGED: Heading gradient to a professional blue/cyan blend */}
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                {post.title}
                            </h1>
                            <div className="text-sm text-gray-500 mb-6 flex items-center space-x-4">
                                <span className="flex items-center">
                                    {/* CHANGED: Icon color to blue-600 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    By {post.author}
                                </span>
                                <span className="flex items-center">
                                    {/* CHANGED: Icon color to blue-600 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {post.date}
                                </span>
                            </div>
                            
                            {/* CHANGED: Prose styling from prose-invert to standard prose with gray text */}
                            <div className="mt-8 prose prose-lg text-gray-700 max-w-none">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;