import React, { useState, useEffect, useRef } from 'react';
import ResourcesPageTemplate from '../ResourcesPageTemplate';
import useInView from '../../hooks/useInView';
// import { coursesData } from '../data/coursesData';
// import { Link } from 'react-router-dom';

// Modal component for the registration form
const EventRegistrationModal = ({ event, onClose }) => {
    const modalRef = useRef(null);

    // Close modal on escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Close modal when clicking outside of it
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    if (!event) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={handleOutsideClick}
        >
            <div 
                ref={modalRef} 
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white text-gray-900 rounded-lg shadow-2xl transform scale-100 opacity-100 transition-all duration-300"
                onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold">Register for {event.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-3xl font-bold">&times;</button>
                </div>
                <div className="p-6">
                    <p className="mb-4 text-sm text-gray-600">
                        Please fill out the form below to secure your spot.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message (Optional)</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="3"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CommunityEvents = ({ isLoggedIn, onLogout, cartItemsCount }) => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <ResourcesPageTemplate 
            title="Community Events" 
            breadcrumb="Community Events"
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            cartItemsCount={cartItemsCount}
        >
            {selectedEvent && <EventRegistrationModal event={selectedEvent} onClose={handleCloseModal} />}
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Join Our Upcoming Community Events.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    From weekly mentorship sessions to coding sprints, our events are designed to help you connect, learn, and grow with the community.
                </p>
                <div className="w-full mt-12">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-6 rounded-2xl shadow-lg mb-6 text-left transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                            onClick={() => handleEventClick(event)}
                        >
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