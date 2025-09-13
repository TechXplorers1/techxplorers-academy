import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

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

const ResourcesPageTemplate = ({ title, breadcrumb, children }) => {
    const [headerRef, headerInView] = useInView({ threshold: 0.1 });

    return (
        <div className="bg-white text-gray-900 min-h-screen font-inter">
            <Header isLandingPage={false} />
            
            <div ref={headerRef} className={`relative pt-24 pb-12 overflow-hidden bg-[#120D25] text-white ${headerInView ? 'is-visible' : ''}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-left" style={{ animationDelay: '0ms' }}>{title}</h1>
                    <nav className="flex items-center text-sm font-semibold animate-fade-in-left" style={{ animationDelay: '200ms' }}>
                        <Link to="/" className="text-purple-300 hover:text-white">Home</Link>
                        <span className="mx-2">&gt;</span>
                        <Link to="/resources/free-resources" className="text-purple-300 hover:text-white">Resources</Link>
                        <span className="mx-2">&gt;</span>
                        <span className="text-white">{breadcrumb}</span>
                    </nav>
                </div>
            </div>

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