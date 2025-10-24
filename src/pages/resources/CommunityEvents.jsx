import React, { useState, useEffect, useRef } from 'react';
import ResourcesPageTemplate from '../ResourcesPageTemplate';
import useInView from '../../hooks/useInView';
// import { coursesData } from '../data/coursesData';
// import { Link } from 'react-router-dom';

// Modal component for the registration form
const EventRegistrationModal = ({ event, onClose }) => {
    const modalRef = useRef(null);
    const [isRegistered, setIsRegistered] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate registration and show success view
        setIsRegistered(true);
        // In a real app, you would submit the form data to a server here
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
                    <h3 className="text-2xl font-bold">{isRegistered ? 'Registration Successful!' : `Register for ${event.title}`}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-3xl font-bold">&times;</button>
                </div>
                <div className="p-6">
                    {!isRegistered ? (
                        <>
                            <p className="mb-4 text-sm text-gray-600">
                                Please fill out the form below to secure your spot.
                            </p>
                            <form className="space-y-4" onSubmit={handleSubmit}>
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
                        </>
                    ) : (
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-lg text-gray-800 mb-4">You are all set for **{event.title}**!</p>
                            <a 
                                href={event.link || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                            >
                                {event.link ? 'Go to Event Link' : 'Event Details Sent to Email'}
                            </a>
                            <button onClick={onClose} className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// MODIFIED: Accept events via props
const CommunityEvents = ({ isLoggedIn, onLogout, cartItemsCount, events }) => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });
    const [selectedEvent, setSelectedEvent] = useState(null);

    // REMOVED: Static events array

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
                    {(events || []).length > 0 ? (
                        (events || []).map((event, index) => (
                            <div
                                key={event.id || index}
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
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-600">No community events are currently scheduled. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </ResourcesPageTemplate>
    );
};

export default CommunityEvents;