import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';

// Login Required Modal Component
const LoginRequiredModal = ({ onClose, onLoginRedirect }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4"
            onClick={handleOutsideClick}
        >
            <div
                ref={modalRef}
                className="w-full max-w-sm bg-white text-gray-900 rounded-lg shadow-2xl p-6 text-center"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-4">Login Required</h3>
                <p className="text-gray-700 mb-6">You need to be logged in to access this feature.</p>
                <button
                    onClick={onLoginRedirect}
                    className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

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

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return [ref, inView];
};

const CourseDetailsTemplate = ({ onAddToCart, onAddToWishlist, onRemoveFromWishlist, onRemoveFromCart, cart, wishlist, isLoggedIn, onLogout, cartItemsCount, enrolledCourses, coursesData }) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [expandedModules, setExpandedModules] = useState({});
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [pageRef, pageInView] = useInView({ threshold: 0.1 });
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const allCourses = Object.values(coursesData).flat();
    const relatedCourses = allCourses.filter(c => c.id !== courseId).slice(0, 3);

    useEffect(() => {
        const foundCourse = allCourses.find(c => c.id === courseId);
        setCourse(foundCourse);
    }, [courseId, coursesData, allCourses]);

    const handleCourseClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleModule = (index) => {
        setExpandedModules(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleWishlistClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        if (wishlist.some(item => item.id === course.id)) {
            onRemoveFromWishlist(course.id);
            setPopupMessage(`${course.title} removed from wishlist.`);
        } else {
            onAddToWishlist(course);
            setPopupMessage(`${course.title} added to wishlist.`);
        }
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowSharePopup(true);
        setTimeout(() => setShowSharePopup(false), 2000);
    };

    const handleAddToCartClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        if (cart.some(item => item.id === course.id)) {
            onRemoveFromCart(course.id);
            setPopupMessage(`${course.title} removed from cart.`);
        } else {
            onAddToCart(course);
            setPopupMessage(`${course.title} added to cart.`);
        }
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        navigate('/login');
    };

    if (!course) {
        return <div className="text-center py-20">Course not found.</div>;
    }
    
    const getCategoryLink = (category) => {
        const categoryMap = {
            'Product & Strategy': '/all-stacks/product-strategy',
            'UX & UI Design': '/all-stacks/ux-ui-design',
            'Engineering & Development': '/all-stacks/engineering-development',
            'Data & Analytics': '/all-stacks/data-analytics',
            'Cybersecurity & Compliance': '/all-stacks/cybersecurity-compliance',
            'AI & Automation': '/all-stacks/ai-automation',
            'Marketing': '/all-stacks/marketing',
            'Development': '/all-stacks/engineering-development'
        };
        return categoryMap[category] || '#';
    };
    
    const isEnrolled = isLoggedIn && enrolledCourses.some(item => item.id === course?.id);
    const isInCart = isLoggedIn && cart.some(item => item.id === course?.id);
    const isInWishlist = isLoggedIn && wishlist.some(item => item.id === course?.id);

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: course.category, path: getCategoryLink(course.category) },
        { name: course.title, path: "" }
    ];

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen font-inter">
            {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} onLoginRedirect={handleLoginRedirect} />}
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
            <Hero 
                title={course.title}
                breadcrumbs={breadcrumbs}
            />

            <main ref={pageRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {showPopup && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg z-50 animate-fade-in-down">
                        {popupMessage}
                    </div>
                )}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-700 delay-100 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Overview</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {course.description}
                            </p>
                        </div>

                        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-700 delay-200 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">What You'll Learn</h2>
                            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                                {(course.learningOutcomes || []).map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700 animate-slide-in-right" style={{animationDelay: `${index * 100}ms`}}>
                                        <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-700 delay-300 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Curriculum</h2>
                            <div className="space-y-6">
                                {(course.curriculum || []).map((module, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-4">
                                        <button
                                            className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
                                            onClick={() => toggleModule(index)}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800">{module.title}</h3>
                                            <svg className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${expandedModules[index] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedModules[index] ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                            <ul className="text-gray-600 ml-4 space-y-1">
                                                {(module.lessons || []).map((lesson, lessonIndex) => (
                                                    <li key={lessonIndex} className="flex items-center text-lg">
                                                        <svg className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.5 5a2.5 2.5 0 015 0v.5a2.5 2.5 0 01-5 0V5zM2.5 12.5a2.5 2.5 0 015 0v.5a2.5 2.5 0 01-5 0v-.5zM12.5 5a2.5 2.5 0 015 0v.5a2.5 2.5 0 01-5 0V5zM12.5 12.5a2.5 2.5 0 015 0v.5a2.5 2.5 0 01-5 0v-.5z" />
                                                        </svg>
                                                        {lesson}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-700 delay-400 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Mentors</h2>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {(course.mentors || []).map((mentor, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <img src={mentor.image} alt={mentor.name} className="w-20 h-20 rounded-full object-cover border-4 border-purple-600"/>
                                        <div>
                                            <h4 className="text-xl font-semibold">{mentor.name}</h4>
                                            <p className="text-gray-600">{mentor.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:col-span-1">
                        <div className={`bg-white rounded-3xl shadow-2xl p-6 sticky top-28 transition-all duration-700 delay-500 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-3xl font-bold text-purple-600">${course.price}</h3>
                                <div className="flex items-center">
                                    <StarRating rating={course.rating} />
                                    <span className="text-sm text-gray-500 ml-2">({course.rating})</span>
                                </div>
                            </div>
                            {isLoggedIn && isEnrolled ? (
                                <Link to={`/course/${course.id}`} className="w-full py-4 bg-green-500 text-white font-semibold rounded-full text-lg shadow-lg hover:bg-green-600 transition-colors block text-center">
                                    Go to Course
                                </Link>
                            ) : (
                                <button
                                    onClick={handleAddToCartClick}
                                    className={`w-full py-4 font-semibold rounded-full text-lg shadow-lg transition-colors ${isInCart ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                                >
                                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                            )}
                            <div className="flex justify-between items-center mt-4 space-x-2">
                                <button
                                    className={`flex-1 py-3 px-4 rounded-full font-semibold border transition-colors ${isInWishlist ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
                                    onClick={handleWishlistClick}
                                    disabled={isEnrolled}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 inline-block ${isInWishlist ? 'text-white' : 'text-gray-500'}`} fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                                </button>
                                <div className="relative">
                                    <button
                                        className="py-3 px-4 rounded-full font-semibold border bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 transition-colors"
                                        onClick={handleShareClick}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.684l-2.618 2.618a1.5 1.5 0 01-2.122-2.122l2.618-2.618m4.936-4.936l2.618-2.618a1.5 1.5 0 012.122 2.122l-2.618 2.618m-4.936 4.936l2.618-2.618a1.5 1.5 0 00-2.122-2.122l-2.618 2.618" />
                                        </svg>
                                        <span className="ml-2 hidden lg:inline">Share</span>
                                    </button>
                                    {showSharePopup && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg py-1 px-3 animate-fade-in">
                                            Link Copied!
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ul className="mt-6 space-y-3 text-gray-700">
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Fully On-Demand</li>
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Includes Mentorship</li>
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Certificate of Completion</li>
                                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Real-World Projects</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 mt-12 transition-all duration-700 delay-600 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Courses You May Like</h2>
                    <div className="flex overflow-x-auto gap-8 py-4 scrollbar-hide">
                        {relatedCourses.map((relatedCourse, index) => (
                            <Link key={index} to={`/course-details/${relatedCourse.id}`} onClick={handleCourseClick} className="flex-none w-80">
                                <div className="bg-gray-100 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
                                    <img src={relatedCourse.image} alt={relatedCourse.title} className="w-full h-32 object-cover rounded-md mb-3"/>
                                    <h4 className="text-lg font-bold">{relatedCourse.title}</h4>
                                    <p className="text-sm text-gray-600">by {relatedCourse.instructor}</p>
                                    <div className="flex items-center mt-2">
                                        <StarRating rating={relatedCourse.rating} />
                                        <span className="text-xs text-gray-500 ml-2">({relatedCourse.rating})</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
            
            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out forwards;
                }
                .animate-slide-in-right {
                    opacity: 0;
                    transform: translateX(20px);
                    animation: slide-in-right 0.5s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }

                /* Hide scrollbar for the carousel on Webkit browsers */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for the carousel on Firefox */
                .scrollbar-hide {
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CourseDetailsTemplate;