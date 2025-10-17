import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

// NEW COMPONENT: Payment Modal
const PaymentModal = ({ total, onClose, onPayNow }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4">
            <div className="w-full max-w-lg bg-white text-gray-900 rounded-lg shadow-2xl p-8 transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Simulated Checkout</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {/* Changed text to reference a dummy PayPal/Gateway */}
                <p className="text-gray-700 mb-4">This simulates a third-party payment gateway experience (e.g., PayPal, Stripe, etc.).</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold mb-2">Payment Details</h4>
                    <div className="flex justify-between font-bold text-3xl text-blue-600">
                        <span>Total Due:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Dummy fields to simulate card entry */}
                    <input type="text" placeholder="Card Number (4444 xxxx xxxx 1111)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" disabled/>
                    <div className="flex space-x-4">
                        <input type="text" placeholder="MM/YY" className="w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" disabled/>
                        <input type="text" placeholder="CVC" className="w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" disabled/>
                    </div>
                </div>

                <button
                    onClick={onPayNow}
                    className="w-full mt-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-[1.01]"
                >
                    Pay Now (${total.toFixed(2)})
                </button>
                <p className="text-sm text-center text-gray-500 mt-3">By clicking 'Pay Now', you confirm your purchase.</p>
            </div>
        </div>
    );
}

const CartPage = ({ cartItems, onRemoveFromCart, cartItemsCount, isLoggedIn, onLogout, onCheckout, coursesData }) => {
    // MODIFIED: Total is now just the subtotal (no tax)
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
    const total = subtotal; 

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const navigate = useNavigate();

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Your Cart", path: "/cart" }
    ];

    const handleCheckoutClick = () => {
        if (!isLoggedIn) {
            alert("Please log in to proceed to checkout.");
            navigate('/login');
        } else {
            // Open the payment modal
            setShowPaymentModal(true);
        }
    };
    
    // NEW: Function executed when "Pay Now" is clicked in the modal
    const handlePayNow = async () => {
        // Close the modal immediately for better UX
        setShowPaymentModal(false);
        
        // Call the onCheckout function, which returns a boolean for success
        const success = await onCheckout();
        
        if (success) {
            // Navigate to the enrolled courses dashboard upon successful checkout
            navigate('/dashboard/enrolled-courses');
        } else {
            // In a real app, you would show an error message.
            alert("Payment simulation failed. Please try again.");
        }
    };


    return (
        <div className="bg-gray-100 text-gray-900 min-h-screen font-inter">
            {/* Payment Modal is rendered conditionally */}
            {showPaymentModal && (
                <PaymentModal 
                    total={total}
                    onClose={() => setShowPaymentModal(false)}
                    onPayNow={handlePayNow}
                />
            )}

            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData}  />
            <Hero
                title="Your Cart"
                breadcrumbs={breadcrumbs}
            />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Explore our courses and find the perfect stack for your career.</p>
                        <Link to="/all-stacks/free-stacks" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 10a4 4 0 010 5.197" />
                            </svg>
                            Start Exploring
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 transition-transform duration-300 hover:scale-[1.01]">
                                    <img src={item.image} alt={item.title} className="w-full md:w-48 h-32 object-cover rounded-2xl"/>
                                    <div className="flex-grow text-center md:text-left">
                                        <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                                        <p className="text-lg font-semibold text-blue-600 mt-2">${(item.price || 0).toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => onRemoveFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors transform hover:scale-110 flex-shrink-0"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-28">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
                                <div className="space-y-4 text-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 my-4 pt-4"></div>
                                    <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckoutClick}
                                    className="w-full mt-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;