import React from 'react';
import { Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const Wishlist = ({ isLoggedIn }) => {
    const wishlistItems = [
        {
            id: 1,
            title: "Ai Automation: Build Smart Systems",
            description: "Learn to automate tasks and build intelligent systems using AI tools and principles.",
            price: "$499",
            image: "https://placehold.co/300x200/E9EFF1/5A5A23?text=AI+Automation"
        },
        {
            id: 2,
            title: "Cybersecurity & Compliance Fundamentals",
            description: "Understand the core concepts of cybersecurity and learn to ensure compliance in your organization.",
            price: "$599",
            image: "https://placehold.co/300x200/EFE9F1/235A4A?text=Cybersecurity"
        },
    ];

    const WishlistItem = ({ item }) => (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 transition-transform transform duration-300 hover:scale-[1.01]">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl" />
            <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">{item.price}</p>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors transform duration-300 hover:scale-105">
                    Add to Cart
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition-colors transform duration-300 hover:scale-105">
                    Remove
                </button>
            </div>
        </div>
    );

    return (
        <DashboardPageTemplate isLoggedIn={isLoggedIn} title="My Wishlist">
            <div className="space-y-6">
                {wishlistItems.length > 0 ? (
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

export default Wishlist;