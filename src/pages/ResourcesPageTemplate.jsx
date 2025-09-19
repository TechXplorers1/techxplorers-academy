import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'; // Import the Hero component

const useInView = (options) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(entry.target);
            }
        };
    }, [options]);

    return [ref, inView];
};

const ResourcesPageTemplate = ({ isLoggedIn, onLogout, cartItemsCount, title, breadcrumb, children }) => {
    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/free-resources" },
        { name: breadcrumb, path: "" }
    ];

    return (
        <div className="bg-white text-gray-900 min-h-screen font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
            <Hero
                title={title}
                breadcrumbs={breadcrumbs}
            />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </main>

            <Footer />
            
            <style>{`
                @keyframes fade-in-left {
                    0% { transform: translateX(-20px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes slide-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }

                .is-visible .animate-fade-in-left {
                    animation: fade-in-left 0.6s ease-out forwards;
                }
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease-out;
                }
                .is-visible .animate-on-scroll {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

export default ResourcesPageTemplate;