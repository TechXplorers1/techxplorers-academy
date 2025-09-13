import React from 'react';
import ResourcesPageTemplate from './ResourcesPageTemplate';
import useInView from '../../hooks/useInView';

const CommunityEvents = () => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });

    const events = [
        {
            title: "Weekly Mentorship Session",
            date: "Every Wednesday",
            time: "7:00 PM EST",
            description: "Join our weekly mentorship sessions for live Q&A and project feedback.",
            type: "Online",
        },
        {
            title: "Web Development Sprint",
            date: "Nov 15-17, 2023",
            time: "All Day",
            description: "A three-day sprint to build a new feature for a real-world client.",
            type: "Online",
        },
        {
            title: "Data Science Workshop",
            date: "Dec 5, 2023",
            time: "2:00 PM EST",
            description: "Learn advanced data visualization techniques with Python.",
            type: "Online",
        },
    ];

    return (
        <ResourcesPageTemplate title="Community Events" breadcrumb="Community Events">
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Join Our Upcoming Community Events.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    From weekly mentorship sessions to coding sprints, our events are designed to help you connect, learn, and grow with the community.
                </p>
                <div className="w-full mt-12">
                    {events.map((event, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-2xl shadow-lg mb-6 text-left transition-all duration-300 hover:shadow-2xl hover:scale-105">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">{event.type}</span>
                            </div>
                            <p className="text-sm text-gray-600">{event.date} | {event.time}</p>
                            <p className="text-gray-700 mt-4">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ResourcesPageTemplate>
    );
};

export default CommunityEvents;