import React from 'react';
import ResourcesPageTemplate from './ResourcesPageTemplate';
import useInView from '../../hooks/useInView';

const SuccessStories = () => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });

    const stories = [
        {
            name: "Maria Garcia",
            story: "Thanks to the BraveStack, I landed my dream job as a UX Designer at a leading tech company. The project-based learning and mentorship were invaluable.",
            role: "UX Designer",
            image: "https://placehold.co/100x100/9b59b6/ffffff?text=MG",
        },
        {
            name: "Alex Chen",
            story: "The Engineering & Development stack gave me the practical skills I needed to build a robust portfolio. I'm now a proud Full-Stack Developer.",
            role: "Full-Stack Developer",
            image: "https://placehold.co/100x100/3498db/ffffff?text=AC",
        },
        {
            name: "Samira Ahmed",
            story: "I switched careers from marketing to data science, and the Data & Analytics stack made the transition seamless. The community support was incredible.",
            role: "Data Analyst",
            image: "https://placehold.co/100x100/e67e22/ffffff?text=SA",
        },
    ];

    return (
        <ResourcesPageTemplate title="Success Stories" breadcrumb="Success Stories">
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">From Learners to Leaders.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    Read the inspiring journeys of our members who have transformed their careers and achieved their goals with the help of our community and stacks.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">
                    {stories.map((story, index) => (
                        <div key={index} className="bg-gray-100 p-8 rounded-2xl shadow-lg space-y-4 text-left transition-all duration-300 hover:shadow-2xl hover:scale-105">
                            <p className="text-gray-700 italic">"{story.story}"</p>
                            <div className="flex items-center space-x-4 mt-6">
                                <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md"/>
                                <div>
                                    <h4 className="text-xl font-bold">{story.name}</h4>
                                    <p className="text-purple-600 font-semibold text-sm">{story.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ResourcesPageTemplate>
    );
};

export default SuccessStories;