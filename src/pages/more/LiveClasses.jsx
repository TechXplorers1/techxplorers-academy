import React, { useState, useRef, useEffect } from 'react';
import MorePageTemplate from '../MorePageTemplate';
import useInView from '../../hooks/useInView';
import { Link, useNavigate } from 'react-router-dom';

const LoginRequiredModal = ({ onClose, onLoginRedirect }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="w-full max-w-sm bg-white text-gray-900 rounded-lg shadow-2xl p-6 text-center"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-4">Login Required</h3>
                <p className="text-gray-700 mb-6">You must be logged in to register for a live class.</p>
                <button
                    onClick={onLoginRedirect}
                    className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

const RegistrationFormModal = ({ event, onClose, onRegisterSuccess }) => {
    const modalRef = useRef(null);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegisterSuccess(event);
        alert(`You have successfully registered for: ${event.title}. A confirmation link has been sent to ${email}.`);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white text-gray-900 rounded-lg shadow-2xl transform scale-100 opacity-100 transition-all duration-300"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold">Register for {event.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-3xl font-bold">&times;</button>
                </div>
                <div className="p-6">
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            {event.price > 0 ? `Pay $${event.price} and Register` : 'Register for Free'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LiveClasses = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , onRegisterLiveClass, registeredLiveClasses = [], liveClassesData }) => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationFormModal, setShowRegistrationFormModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    const handleRegisterClick = (event) => {
        if (!isLoggedIn) {
            setSelectedEvent(event);
            setShowLoginModal(true);
        } else {
            setSelectedEvent(event);
            setShowRegistrationFormModal(true);
        }
    };

    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        navigate('/login');
    };

    const handleRegisterSuccess = (event) => {
        onRegisterLiveClass(event);
        setShowRegistrationFormModal(false);
    };

    const isClassRegistered = (classId) => {
        return registeredLiveClasses.includes(classId);
    };

    return (
        <>
            {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} onLoginRedirect={handleLoginRedirect} />}
            {showRegistrationFormModal && <RegistrationFormModal event={selectedEvent} onClose={() => setShowRegistrationFormModal(false)} onRegisterSuccess={handleRegisterSuccess} />}
            <MorePageTemplate title="Live Classes" breadcrumb="Live Classes" isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount}>
                <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Join Our Live Interactive Classes.
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Participate in real-time, expert-led classes and get your questions answered live.
                    </p>

                    <div className="w-full mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {liveClassesData.map((event, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-lg space-y-4 text-left transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-xl mb-4"/>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>{event.date}</span>
                                    <span>{event.time}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                <p className="text-sm text-gray-700">{event.description}</p>
                                <div className="flex items-center mt-4">
                                    <img src={`https://placehold.co/40x40/E9D5FF/9333EA?text=${event.instructor.split(' ').map(n => n[0]).join('')}`} alt={event.instructor} className="w-8 h-8 rounded-full mr-2"/>
                                    <span className="text-sm font-semibold text-purple-600">{event.instructor}</span>
                                </div>
                                {isLoggedIn && isClassRegistered(event.id) ? (
                                    <Link to={`/dashboard/live-class/${event.id}`} className="w-full block text-center mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                                        View Recordings
                                    </Link>
                                ) : (
                                    <button
                                        className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                                        onClick={() => handleRegisterClick(event)}
                                    >
                                        {event.price > 0 ? `Register for $${event.price}` : 'Register for Free'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </MorePageTemplate>
        </>
    );
};

export default LiveClasses;