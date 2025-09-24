import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

export const Wishlist = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , wishlistItems, onRemoveFromWishlist, onAddToCart, user }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const WishlistItem = ({ item }) => (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 transition-transform transform duration-300 hover:scale-[1.01]">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl" />
            <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">Instructor: {item.instructor}</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col space-y-2">
                <button
                    onClick={() => {
                        onAddToCart(item);
                        onRemoveFromWishlist(item.id);
                        setPopupMessage(`${item.title} added to cart!`);
                        setShowPopup(true);
                        setTimeout(() => setShowPopup(false), 2000);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors transform duration-300 hover:scale-105">
                    Add to Cart
                </button>
                <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition-colors transform duration-300 hover:scale-105">
                    Remove
                </button>
            </div>
        </div>
    );

    return (
        <DashboardPageTemplate 
            isLoggedIn={isLoggedIn} 
            onLogout={onLogout} 
            cartItemsCount={cartItemsCount} 
            title="My Wishlist"
            user={user}
        >
            {showPopup && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg z-50 animate-fade-in-down">
                    {popupMessage}
                </div>
            )}
            <div className="space-y-6">
                {wishlistItems && wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                        <WishlistItem key={item.id} item={item} />
                    ))
                ) : (
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-[1.01]">
                        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
                        <Link to="/all-stacks/free-stacks" className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                            Browse Courses
                        </Link>
                    </div>
                )}
            </div>
        </DashboardPageTemplate>
    );
};