import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const CartPage = ({ cartItems, onRemoveFromCart, cartItemsCount, isLoggedIn, onLogout, onCheckout }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.08;
    const estimatedTax = subtotal * taxRate;
    const total = subtotal + estimatedTax;

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
            onCheckout();
            navigate('/dashboard/enrolled-courses');
        }
    };

    return (
        <div className="bg-gray-100 text-gray-900 min-h-screen font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
            <Hero
                title="Your Cart"
                breadcrumbs={breadcrumbs}
            />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Explore our courses and find the perfect stack for your career.</p>
                        <Link to="/all-stacks/free-stacks" className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-colors transform hover:scale-105">
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
                                        <p className="text-lg font-semibold text-purple-600 mt-2">${item.price.toFixed(2)}</p>
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
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Estimated Tax (8%)</span>
                                        <span className="font-semibold text-gray-800">${estimatedTax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 my-4 pt-4"></div>
                                    <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckoutClick}
                                    className="w-full mt-8 py-4 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 transition-colors transform hover:scale-105"
                                >
                                    Proceed to Checkout
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