import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import { blogPosts } from '../data/blogPosts';

const BlogPage = ({ isLoggedIn, onLogout, cartItemsCount }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = blogPosts.find(p => p.id === id);
        setPost(foundPost);
    }, [id]);

    if (!post) {
        return (
            <div className="bg-[#120D25] text-white min-h-screen flex items-center justify-center">
                <p className="text-2xl">Blog post not found...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#120D25] text-white min-h-screen font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
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
                            <p className="text-lg text-gray-300">
                                {post.summary}
                            </p>
                            {/* Placeholder for full blog post content, using Tailwind Prose for styling */}
                            <div className="mt-8 prose prose-lg prose-invert text-gray-300">
                                <p>This is the full content of the blog post. Here you would expand on the summary with more detailed information, examples, and images. The blog content is crucial for providing value to your readers. It should be well-structured with headings and paragraphs to ensure readability.</p>
                                <p>For example, you could include code snippets, expert interviews, or a step-by-step guide on the topic. The goal is to make the content both informative and easy to digest.</p>
                                <h3>Key Takeaways</h3>
                                <ul className="list-disc list-inside">
                                    <li>Highlighting the main points helps readers quickly grasp the core message.</li>
                                    <li>Using bullet points breaks up large blocks of text.</li>
                                    <li>Summarizing the article at the end reinforces the main ideas.</li>
                                </ul>
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