import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { coursesData } from '../../data/coursesData';

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

const CourseDetailsTemplate = ({ onAddToCart, onAddToWishlist, cart, wishlist }) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [expandedModules, setExpandedModules] = useState({});
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [pageRef, pageInView] = useInView({ threshold: 0.1 });
    const [showPopup, setShowPopup] = useState(false); // New state for success pop-up
    const [popupMessage, setPopupMessage] = useState(''); // New state for pop-up message

    useEffect(() => {
        let foundCourse = null;
        for (const category in coursesData) {
            foundCourse = coursesData[category].find(c => c.id === courseId);
            if (foundCourse) break;
        }
        setCourse(foundCourse);
    }, [courseId]);

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
        if (wishlist.some(item => item.id === course.id)) {
            setPopupMessage('This course is already in your wishlist!');
        } else {
            onAddToWishlist(course);
            setPopupMessage(`${course.title} has been added to your wishlist!`);
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
        if (cart.some(item => item.id === course.id)) {
            setPopupMessage('This course is already in your cart!');
        } else {
            onAddToCart(course);
            setPopupMessage(`${course.title} has been added to your cart!`);
        }
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    if (!course) {
        return <div className="text-center py-20">Course not found.</div>;
    }

    const courseDetails = {
        description: "Welcome to the BraveBA | Business Analyst Stack, a comprehensive course designed for aspiring and current business analysts. This program equips you with the essential skills and methodologies to bridge the gap between business needs and technical solutions. Through a blend of theoretical knowledge and practical, project-based learning, you will master the art of requirements gathering, stakeholder management, and data-driven decision-making. By the end of this stack, you'll be ready to tackle real-world challenges and drive impactful change within any organization.",
        learningOutcomes: [
            "Learn to identify project risks and opportunities.",
            "Master Agile project management methodologies.",
            "Develop strong communication and leadership skills.",
            "Create effective project timelines and budgets.",
            "Gain hands-on experience with industry-standard tools.",
        ],
        curriculum: [
            {
                title: "Module 1: Foundations of Business Analysis",
                lessons: [
                    "What is a Business Analyst?",
                    "The BA Role in the Project Lifecycle",
                    "Key Skills and Responsibilities",
                    "Understanding Business Requirements"
                ],
            },
            {
                title: "Module 2: Agile Methodologies",
                lessons: [
                    "Agile vs. Waterfall Methodologies",
                    "Scrum and Kanban",
                    "Creating a Project Plan",
                    "User Stories and Use Cases"
                ],
            },
            {
                title: "Module 3: Stakeholder Engagement",
                lessons: [
                    "Identifying and Analyzing Stakeholders",
                    "Communication Strategies",
                    "Conflict Resolution",
                    "Eliciting and Validating Requirements"
                ],
            },
            {
                title: "Module 4: Business Modeling and Tools",
                lessons: [
                    "Process Modeling with BPMN",
                    "Data Modeling",
                    "Using Jira and Confluence",
                    "Creating Wireframes and Prototypes"
                ],
            },
        ],
        mentors: [
            { name: "Victoria", title: "Lead Business Analyst", image: "https://placehold.co/100x100/A78BFA/FFFFFF?text=V" },
            { name: "Daniel Olayinka", title: "Scrum Master", image: "https://placehold.co/100x100/8B5CF6/FFFFFF?text=D" },
        ],
    };

    const relatedCourses = [
        { id: 'Braveprdo-product-owner', title: 'BravePrdO | Product Owner Stack', price: 159.99, rating: 4.0, instructor: 'Victoria', image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=BravePrdO' },
        { id: 'Bravesm-scrum-master', title: 'BraveSM | Scrum Master Stack', price: 119.99, rating: 5.0, instructor: 'Daniel Olayinka', image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=BraveSM' },
        { id: 'Braveprjm-project-manager', title: 'BravePrjM | Project Manager Stack', price: 139.99, rating: 4.5, instructor: 'Victoria', image: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=BravePrjM' }
    ];

    const getCategoryLink = (category) => {
        const categoryMap = {
            'Product & Strategy': '/all-stacks/product-strategy',
            'UX & UI Design': '/all-stacks/ux-ui-design',
            'Engineering & Development': '/all-stacks/engineering-development',
            'Data & Analytics': '/all-stacks/data-analytics',
            'Cybersecurity & Compliance': '/all-stacks/cybersecurity-compliance',
            'AI & Automation': '/all-stacks/ai-automation',
            'Marketing': '/all-stacks/marketing',
            'Development': '/all-stacks/engineering-development' // Assuming Free Stacks are also Development-focused
        };
        return categoryMap[category] || '#';
    };
    
    // Check if the course is already in the cart or wishlist
    const isInCart = cart.some(item => item.id === course?.id);
    const isInWishlist = wishlist.some(item => item.id === course?.id);

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen font-inter">
            <Header />
            
            {showPopup && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg z-50 animate-fade-in-down">
                    {popupMessage}
                </div>
            )}
            
            <div className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-r from-[#120D25] to-[#2A2441] text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down" style={{ animationDelay: '0ms' }}>
                        {course.title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-6 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
                        A comprehensive course for aspiring Business Analysts.
                    </p>
                    <nav className="flex items-center text-sm font-semibold animate-fade-in-down" style={{ animationDelay: '400ms' }}>
                        <Link to="/" className="text-purple-300 hover:text-white transition-colors duration-300">Home</Link>
                        <span className="mx-2 text-gray-400">&gt;</span>
                        <Link to={getCategoryLink(course.category)} className="text-purple-300 hover:text-white transition-colors duration-300">
                            {course.category}
                        </Link>
                        <span className="mx-2 text-gray-400">&gt;</span>
                        <span className="text-white">{course.title}</span>
                    </nav>
                </div>
            </div>

            <main ref={pageRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-700 delay-100 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Overview</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{courseDetails.description}</p>
                        </div>

                        <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-700 delay-200 ${pageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">What You'll Learn</h2>
                            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                                {courseDetails.learningOutcomes.map((item, index) => (
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
                                {courseDetails.curriculum.map((module, index) => (
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
                                                {module.lessons.map((lesson, lessonIndex) => (
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
                                {courseDetails.mentors.map((mentor, index) => (
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
                            <button
                                onClick={handleAddToCartClick}
                                className="w-full py-4 bg-purple-600 text-white font-semibold rounded-full text-lg shadow-lg hover:bg-purple-700 transition-colors"
                            >
                                Add to Cart
                            </button>
                            <div className="flex justify-between items-center mt-4 space-x-2">
                                <button
                                    className={`flex-1 py-3 px-4 rounded-full font-semibold border transition-colors ${isInWishlist ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
                                    onClick={handleWishlistClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 inline-block ${isInWishlist ? 'text-white' : 'text-gray-500'}`} fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Wishlist
                                </button>
                                <div className="relative">
                                    <button
                                        className="py-3 px-4 rounded-full font-semibold border bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 transition-colors"
                                        onClick={handleShareClick}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.684l-2.618 2.618a1.5 1.5 0 01-2.122-2.122l2.618-2.618m4.936-4.936l2.618-2.618a1.5 1.5 0 012.122 2.122l-2.618 2.618m-4.936 4.936l2.618-2.618a1.5 1.5 0 00-2.122-2.122l-2.618 2.618m4.936 4.936a1.5 1.5 0 00-2.122-2.122l-2.618 2.618" />
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
                    opacity: 0;
                    transform: translateX(20px);
                    animation: slide-in-right 0.5s ease-out forwards;
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