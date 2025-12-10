import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// NEW: Import PayPal components
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

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
const PaymentModal = ({ total, onClose, onApprovePayment, onError }) => {

    // This function is called when the user clicks the PayPal button.
    const createOrder = (data, actions) => {
        return actions.order.create({
            // We only need the purchase amount, not a full breakdown
            purchase_units: [
                {
                    description: "TX Stack Course Purchase",
                    amount: {
                        currency_code: "USD", // Change this if your currency is different
                        value: total.toFixed(2),
                    },
                },
            ],
            // Tell PayPal we are selling digital goods, so no shipping address is needed
            application_context: {
                shipping_preference: 'NO_SHIPPING',
            }
        });
    };

    // This function is called after the user approves the payment in the PayPal popup.
    const onApprove = (data, actions) => {
        // This captures the funds from the transaction.
        return actions.order.capture().then((details) => {
            // 'details' contains info about the successful transaction (e.g., payer name)
            // We now call the function passed from CartPage to finalize the purchase in our database
            onApprovePayment(details);
        });
    };

    // This function is called if an error occurs during the payment process.
    const onErrorHandler = (err) => {
        console.error("PayPal Checkout Error:", err);
        alert("An error occurred with your payment. Please try again.");
        if (onError) onError(err); // Optional: pass error up
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4">
            <div className="w-full max-w-lg bg-white text-gray-900 rounded-lg shadow-2xl p-8 transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Complete Your Purchase</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between font-bold text-3xl text-blue-600">
                        <span>Total Due:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* --- REAL PAYPAL BUTTONS --- */}
                {/* We check if the Client ID has been set. */}
                {PAYPAL_CLIENT_ID === "YOUR_SANDBOX_CLIENT_ID" ? (
                    // Show a message if the Client ID is still the placeholder
                    <div className="text-center text-red-600 font-semibold p-4 bg-red-50 rounded-lg">
                        <strong>Payment Gateway is not configured.</strong>
                        <p className="text-sm font-normal">Please add your PayPal Client ID to `CartPage.jsx` to enable checkout.</p>
                    </div>
                ) : (
                    // If Client ID is set, show the PayPal provider and buttons
                    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "USD" }}>
                        <PayPalButtons
                            style={{ layout: "vertical" }} // Renders PayPal, Debit/Credit Card buttons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onErrorHandler}
                        />
                    </PayPalScriptProvider>
                )}
                {/* --- END PAYPAL INTEGRATION --- */}
                
                <p className="text-sm text-center text-gray-500 mt-4">
                    You will be redirected to PayPal to complete your payment securely.
                </p>
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
    
    // MODIFIED: This function is now called AFTER PayPal payment is successful
    const handlePaymentSuccess = async (details) => {
        // 'details' object contains payer info and transaction status
        console.log("Payment Successful! Payer details:", details);
        
        // Close the modal immediately for better UX
        setShowPaymentModal(false);
        
        // Call the onCheckout function (from App.jsx) which saves the order
        // and clears the cart in Firebase.
        const success = await onCheckout();
        
        if (success) {
            // Navigate to the enrolled courses dashboard upon successful checkout
            navigate('/dashboard/enrolled-courses');
        } else {
            // This is a critical error: payment was taken but order failed to save.
            alert("Your payment was successful, but we encountered an error enrolling you in the courses. Please contact support immediately.");
        }
    };


    return (
        <div className="bg-gray-100 text-gray-900 min-h-screen font-inter">
            {/* Payment Modal is rendered conditionally */}
            {showPaymentModal && (
                <PaymentModal 
                    total={total}
                    onClose={() => setShowPaymentModal(false)}
                    // MODIFIED: Pass the new success handler to the modal
                    onApprovePayment={handlePaymentSuccess}
                />
            )}

            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData}  />
            <Hero
                title="Your Cart"
                breadcrumbs={breadcrumbs}
            />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {cartItems.length === 0 ? (
                    // ... (no changes to the "empty cart" view)
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
                    // ... (no changes to the cart items list)
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