import React, { useState, useRef, useEffect } from 'react';
import MorePageTemplate from '../MorePageTemplate';
import useInView from '../../hooks/useInView';
import { Link, useNavigate } from 'react-router-dom';
// NEW: Import PayPal components
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// --- IMPORTANT ---
// Get your Sandbox Client ID from the PayPal Developer Dashboard:
// https://developer.paypal.com/developer/applications/
//
// 1. Go to "My Apps & Credentials".
// 2. Create a new "App" (or use the default one).
// 3. Copy the "Client ID" and paste it below.
const PAYPAL_CLIENT_ID = "AcvkSghUkSJW8efQGCNQXTrU5JrcKvFbAniQWrwZ5O-rr3VFjoumhOMK0DmlvlXHguP-u7x-1d0gcgsw"; 
// -----------------

// MODIFIED: Payment Modal now handles the real PayPal flow
const PaymentModal = ({ event, onClose, onApprovePayment }) => {
    // FIX APPLIED HERE: Use parseFloat() to ensure it's a number before calculating total.
    const numericPrice = parseFloat(event.price) || 0; 
    const total = numericPrice; 

    // This function is called when the user clicks the PayPal button.
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    // MODIFIED: Add a clear description for the live class
                    description: `BraveStack Live Class: ${event.title}`, 
                    amount: {
                        currency_code: "USD", // Change this if your currency is different
                        value: total.toFixed(2),
                    },
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING', // It's a digital good
            }
        });
    };

    // This function is called after the user approves the payment in the PayPal popup.
    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            // Call the function passed from LiveClasses to finalize registration
            onApprovePayment(details);
        });
    };

    // This function is called if an error occurs.
    const onErrorHandler = (err) => {
        console.error("PayPal Checkout Error:", err);
        alert("An error occurred with your payment. Please try again.");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4">
            <div className="w-full max-w-lg bg-white text-gray-900 rounded-lg shadow-2xl p-8 transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Register for {event.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold mb-2">Class Price</h4>
                    <div className="flex justify-between font-bold text-3xl text-purple-600">
                        <span>Total Due:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* --- REAL PAYPAL BUTTONS --- */}
                {PAYPAL_CLIENT_ID === "YOUR_SANDBOX_CLIENT_ID" ? (
                    <div className="text-center text-red-600 font-semibold p-4 bg-red-50 rounded-lg">
                        <strong>Payment Gateway is not configured.</strong>
                        <p className="text-sm font-normal">Please add your PayPal Client ID to `LiveClasses.jsx` to enable checkout.</p>
                    </div>
                ) : (
                    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "USD" }}>
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onErrorHandler}
                        />
                    </PayPalScriptProvider>
                )}
                {/* --- END PAYPAL INTEGRATION --- */}
                
                <p className="text-sm text-center text-gray-500 mt-4">
                    You will be redirected to PayPal to complete your registration securely.
                </p>
            </div>
        </div>
    );
}
// ----------------------------------------------------

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

// MODIFIED: Accepts 'user' prop
const RegistrationFormModal = ({ event, user, onClose, onRegisterSuccess }) => {
    const modalRef = useRef(null);
    const [email, setEmail] = useState(user?.email || '');
    const [fullName, setFullName] = useState(user?.name || '');
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
    
    // Logic to disable/pre-fill fields
    const isFieldReadOnly = !!user;

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
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                // MODIFIED: Read-only and styling based on user login state
                                readOnly={isFieldReadOnly}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${isFieldReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                // MODIFIED: Read-only and styling based on user login state
                                readOnly={isFieldReadOnly}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${isFieldReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                            {'Register for Free'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// MODIFIED: Added user state to props
const LiveClasses = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , onRegisterLiveClass, registeredLiveClasses = [], liveClassesData, user }) => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationFormModal, setShowRegistrationFormModal] = useState(false);
    // NEW: State for paid registration flow
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();

    const handleRegisterClick = (event) => {
        if (!isLoggedIn) {
            setSelectedEvent(event);
            setShowLoginModal(true);
        } else if (event.price > 0) {
            setSelectedEvent(event);
            setShowPaymentModal(true); // NEW: Show payment modal for paid classes
        } else {
            setSelectedEvent(event);
            setShowRegistrationFormModal(true); // Show registration form for free classes
        }
    };

    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        navigate('/login');
    };

    // This handler is used for BOTH free and paid registration success
    const handleRegisterSuccess = (event) => {
        onRegisterLiveClass(event);
        setShowRegistrationFormModal(false);
        setShowPaymentModal(false); // Close payment modal too
    };

    // MODIFIED: Renamed from handlePayNow() to handlePaymentSuccess()
    // This is now called by PayPal's onApprove
    const handlePaymentSuccess = (details) => {
        console.log("Payment Successful! Payer details:", details);
        alert(`Payment successful! You are now registered for: ${selectedEvent.title}.`);
        // Now run the original registration success logic
        handleRegisterSuccess(selectedEvent);
    };

    const isClassRegistered = (classId) => {
        return registeredLiveClasses.includes(classId);
    };

    // Filtering logic
    const filteredClasses = liveClassesData.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} onLoginRedirect={handleLoginRedirect} />}
            {/* MODIFIED: Passing 'user' prop to RegistrationFormModal */}
            {showRegistrationFormModal && selectedEvent && (
                <RegistrationFormModal 
                    event={selectedEvent} 
                    user={user}
                    onClose={() => setShowRegistrationFormModal(false)} 
                    onRegisterSuccess={handleRegisterSuccess} 
                />
            )}
            {/* MODIFIED: Payment Modal for paid classes, passing new handler */}
            {showPaymentModal && selectedEvent && (
                <PaymentModal
                    event={selectedEvent}
                    onClose={() => setShowPaymentModal(false)}
                    onApprovePayment={handlePaymentSuccess}
                />
            )}

            <MorePageTemplate title="Live Classes" breadcrumb="Live Classes" isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount}>
                <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Join Our Live Interactive Classes.
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl">
                        Participate in real-time, expert-led classes and get your questions answered live.
                    </p>

                    {/* Search Bar Added Here */}
                    <div className="w-full max-w-lg mx-auto mb-10">
                        <input
                            type="text"
                            placeholder="Search live classes by title, description, or instructor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                        />
                    </div>
                    {/* --------------------------- */}

                    <div className="w-full mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Using filteredClasses instead of liveClassesData */}
                        {filteredClasses.length > 0 ? (
                            filteredClasses.map((event, index) => (
                                <div
                                    key={event.id || index} // Use event.id if available, otherwise index
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
                                            {/* FIX APPLIED HERE: Use parseFloat(event.price) || 0 for robust conversion to number */}
                                            {event.price > 0 ? `Register for $${(parseFloat(event.price) || 0).toFixed(2)}` : 'Register for Free'}
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="lg:col-span-3 text-center py-10">
                                <p className="text-xl text-gray-600">No live classes found matching your search. ⚛️</p>
                            </div>
                        )}
                        {/* --------------------------- */}
                    </div>
                </div>
            </MorePageTemplate>
        </>
    );
};

export default LiveClasses;