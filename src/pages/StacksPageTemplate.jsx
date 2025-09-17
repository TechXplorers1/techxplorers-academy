import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import bg5 from '../assets/bg-6.jpg';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex text-yellow-500">
            {'★'.repeat(fullStars)}
            {halfStar && '½'}
            {'☆'.repeat(emptyStars)}
        </div>
    );
};

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


const StacksPageTemplate = ({ title, breadcrumb, courses }) => {
    const [contentRef, contentInView] = useInView({ threshold: 0.1 });
    const [animatedCourses, setAnimatedCourses] = useState([]);

    useEffect(() => {
        if (contentInView) {
            courses.forEach((_, index) => {
                const timer = setTimeout(() => {
                    setAnimatedCourses(prev => [...prev, index]);
                }, index * 150);
                return () => clearTimeout(timer);
            });
        }
    }, [contentInView, courses]);

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "All Stacks", path: "/all-stacks" },
        { name: breadcrumb, path: "" }
    ];

    return (
        <div className="bg-white text-gray-900 min-h-screen font-inter">
            <Header isLandingPage={false} />
            <Hero
                title={`Category: ${title}`}
                breadcrumbs={breadcrumbs}
            />

            <main ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className={`flex justify-between items-center mb-8 animate-on-scroll ${contentInView ? 'is-visible' : ''}`}>
                    <h2 className="text-3xl font-bold">Courses in this category</h2>
                    <div className="relative">
                        <select className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600">
                            <option>Release Date (newest first)</option>
                            <option>Popularity</option>
                            <option>Price (low to high)</option>
                            <option>Price (high to low)</option>
                        </select>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <Link
                                key={index}
                                to={`/course-details/${course.id}`}
                                className={`group bg-white rounded-2xl relative overflow-hidden transition-all duration-500 w-full md:w-auto course-card ${animatedCourses.includes(index) ? 'is-visible' : ''}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="p-5 h-full flex flex-col gap-3 relative z-20 transition-all duration-500 group-hover:translate-y-[-10px] group-hover:shadow-2xl hover:border-purple-600/20">
                                    <div className="absolute top-3 right-3 bg-[#10b981] text-white py-1 px-2 rounded-full text-xs font-semibold scale-80 opacity-0 transition-all duration-400 delay-100 group-hover:scale-100 group-hover:opacity-100 z-30">NEW</div>
                                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#6D28D9] flex justify-center items-center text-white text-3xl font-bold">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-900 text-lg font-bold m-0">{course.title}</p>
                                        <div className="flex items-center mb-2">
                                            <StarRating rating={course.rating} />
                                            <span className="text-xs text-gray-500 ml-2">({course.rating})</span>
                                        </div>
                                        <p className="text-gray-900 text-xs m-0 opacity-70">by {course.instructor} in {course.category}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                        <p className="text-gray-900 font-bold text-base m-0">${course.price}</p>
                                        <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 scale-90 group-hover:scale-100 group-hover:shadow-lg group-hover:shadow-purple-600/30">
                                            <svg height={16} width={16} viewBox="0 0 24 24">
                                                <path strokeWidth={2} stroke="currentColor" d="M4 12H20M12 4V20" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No courses available in this category yet.</p>
                    )}
                </div>
            </main>

            <Footer />
            
            <style>{`
                @keyframes slide-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fade-in-down {
                    0% { transform: translateY(-20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fade-in-left {
                    0% { transform: translateX(-20px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
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

                .course-card {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease-out;
                }
                .course-card.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

export default StacksPageTemplate;