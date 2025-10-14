// src/pages/more/MorePageTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const MorePageTemplate = ({ isLoggedIn, onLogout, cartItemsCount, title, breadcrumb, children }) => {
    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "More", path: "/more/about-us" },
        { name: breadcrumb, path: "" }
    ];

    return (
        // CHANGED: Background to white, text to dark gray
        <div className="bg-white text-gray-900 min-h-screen font-inter">
            {/* Header no longer needs to pass all props if it uses useAuth() */}
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} /> 
            <Hero
                title={title}
                breadcrumbs={breadcrumbs}
            />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default MorePageTemplate;