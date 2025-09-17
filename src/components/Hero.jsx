// src/components/Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import bg6 from '../assets/bg-6.jpg'; // Import the default background image

// Custom hook for on-scroll animations
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
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, inView];
};

const Hero = ({ title, breadcrumbs }) => {
    const [headerRef, headerInView] = useInView({ threshold: 0.1 });

    return (
        <div ref={headerRef} className={`relative pt-24 pb-12 overflow-hidden bg-[#120D25] text-white ${headerInView ? 'is-visible' : ''}`}>
           
            
            {/* Background Image Container with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg6})` }}
            >
                {/* Add a semi-transparent overlay to keep the content readable */}
                <div className="absolute inset-0 bg-[#00000066] opacity-90"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-left" style={{ animationDelay: '0ms' }}>{title}</h1>
                <nav className="flex items-center text-sm font-semibold animate-fade-in-left" style={{ animationDelay: '200ms' }}>
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index} className="flex items-center">
                            {index > 0 && <span className="mx-2">&gt;</span>}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-white">{crumb.name}</span>
                            ) : (
                                <Link to={crumb.path} className="text-purple-300 hover:text-white">{crumb.name}</Link>
                            )}
                        </span>
                    ))}
                </nav>
            </div>
            
            <style>{`
                @keyframes fade-in-left {
                    0% { transform: translateX(-20px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                .is-visible .animate-fade-in-left {
                    animation: fade-in-left 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Hero;