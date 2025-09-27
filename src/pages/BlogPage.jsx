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

    if (loading) {
        return (
            <div className="bg-[#120D25] text-white min-h-screen flex items-center justify-center">
                <p className="text-2xl">Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-[#120D25] text-white min-h-screen">
                 <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} />
                 <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
                    <p className="text-gray-400 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
                    <Link to="/" className="text-purple-400 hover:text-white transition-colors flex items-center justify-center">
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
        <div className="bg-[#120D25] text-white min-h-screen font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-purple-400 hover:text-white transition-colors mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    <article className="bg-[#18122B] rounded-2xl shadow-xl overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-80 md:h-[400px] object-cover"
                        />
                        <div className="p-8 md:p-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                {post.title}
                            </h1>
                            <div className="text-sm text-gray-400 mb-6 flex items-center space-x-4">
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    By {post.author}
                                </span>
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {post.date}
                                </span>
                            </div>
                            
                            {/* Dynamic content rendering with Tailwind CSS Prose for styling */}
                            <div className="mt-8 prose prose-lg prose-invert text-gray-300 max-w-none">
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