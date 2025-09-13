import React from 'react';
import ResourcesPageTemplate from './ResourcesPageTemplate';
import useInView from '../../hooks/useInView';

const MasterclassReplays = () => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });

    const masterclasses = [
        {
            title: "Intro to Product Strategy",
            instructor: "Victoria",
            date: "Oct 26, 2023",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder URL
        },
        {
            title: "Modern UI/UX with Figma",
            instructor: "Emily Clark",
            date: "Oct 21, 2023",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder URL
        },
        {
            title: "Python for Data Science",
            instructor: "Jane Smith",
            date: "Oct 15, 2023",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder URL
        },
    ];

    return (
        <ResourcesPageTemplate title="Masterclass Replays" breadcrumb="Masterclass Replays">
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Catch Up on Our Expert Masterclasses.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    Browse and watch replays of our exclusive masterclasses led by industry experts.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">
                    {masterclasses.map((masterclass, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-2xl shadow-lg space-y-4 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
                                <iframe
                                    src={masterclass.videoUrl}
                                    title={masterclass.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-gray-900">{masterclass.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">by {masterclass.instructor} on {masterclass.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ResourcesPageTemplate>
    );
};

export default MasterclassReplays;