// src/pages/more/MorePageTemplate.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const MorePageTemplate = ({ title, breadcrumb, children }) => {
    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "More", path: "/more/about-us" },
        { name: breadcrumb, path: "" }
    ];

    return (
        <div className="bg-white text-gray-900 min-h-screen font-inter">
            <Header isLandingPage={false} />
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