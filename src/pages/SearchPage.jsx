import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { coursesData } from '../data/coursesData';

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

const SearchPage = ({ isLoggedIn, onLogout, cartItemsCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState({ courses: [], stacks: [] });

    // Consolidate all courses and stacks into a single array for searching
    const allCourses = Object.values(coursesData).flat();
    const stackCategories = [
        { name: 'Product & Strategy', path: '/all-stacks/product-strategy' },
        { name: 'UX & UI Design', path: '/all-stacks/ux-ui-design' },
        { name: 'Engineering & Development', path: '/all-stacks/engineering-development' },
        { name: 'Data & Analytics', path: '/all-stacks/data-analytics' },
        { name: 'Cybersecurity & Compliance', path: '/all-stacks/cybersecurity-compliance' },
        { name: 'AI & Automation', path: '/all-stacks/ai-automation' },
        { name: 'Marketing', path: '/all-stacks/marketing' },
        { name: 'Free Stacks', path: '/all-stacks/free-stacks' },
    ];

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);

        if (query.trim() === '') {
            setFilteredResults({ courses: [], stacks: [] });
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        // Filter courses
        const matchedCourses = allCourses.filter(course =>
            course.title.toLowerCase().includes(lowerCaseQuery) ||
            course.instructor.toLowerCase().includes(lowerCaseQuery) ||
            course.category.toLowerCase().includes(lowerCaseQuery)
        );

        // Filter stacks
        const matchedStacks = stackCategories.filter(stack =>
            stack.name.toLowerCase().includes(lowerCaseQuery)
        );

        setFilteredResults({ courses: matchedCourses, stacks: matchedStacks });
    };

    const breadcrumbs = [
        { name: "Home", path: "/" },
        { name: "Search Results", path: "" }
    ];

    const hasResults = filteredResults.courses.length > 0 || filteredResults.stacks.length > 0;

    return (
        <div className="bg-white text-gray-900 min-h-screen font-inter">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} />
            <Hero
                title="Search"
                breadcrumbs={breadcrumbs}
            />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="relative w-full md:w-2/3 lg:w-1/2 mx-auto mb-8 shadow-md rounded-full bg-white">
                    <input
                        type="text"
                        placeholder="Search for courses, stacks, or instructors..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-3 pl-12 border-2 border-transparent bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {!searchTerm && (
                    <div className="text-center text-gray-500 text-lg py-10">
                        Start typing to find courses and stacks.
                    </div>
                )}

                {searchTerm && !hasResults && (
                    <div className="text-center text-gray-500 text-lg py-10">
                        No results found for "{searchTerm}".
                    </div>
                )}

                {hasResults && (
                    <div className="space-y-12">
                        {filteredResults.courses.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Courses</h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredResults.courses.map((course, index) => (
                                        <Link
                                            key={index}
                                            to={`/course-details/${course.id}`}
                                            className="group bg-white rounded-2xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl border border-gray-200"
                                        >
                                            <div className="p-5 h-full flex flex-col gap-3 relative z-20">
                                                <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-200 flex justify-center items-center text-white text-3xl font-bold">
                                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-gray-900 text-lg font-bold m-0">{course.title}</p>
                                                    <div className="flex items-center mb-2">
                                                        <StarRating rating={course.rating} />
                                                        <span className="text-xs text-gray-500 ml-2">({course.rating})</span>
                                                    </div>
                                                    <p className="text-gray-900 text-xs m-0 opacity-70">by {course.instructor}</p>
                                                </div>
                                                <div className="flex justify-between items-center mt-auto">
                                                    <p className="text-gray-900 font-bold text-base m-0">${course.price}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {filteredResults.stacks.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Stacks</h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {filteredResults.stacks.map((stack, index) => (
                                        <Link
                                            key={index}
                                            to={stack.path}
                                            className="group bg-white rounded-2xl relative overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl border border-gray-200 p-6 text-center flex flex-col items-center"
                                        >
                                            <div className="text-blue-400 group-hover:text-blue-500 mb-4 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h2.204a2 2 0 01.838.188l4.095 2.048a1 1 0 001.122-.163l4.581-4.581c.31-.31.056-.879-.318-1.026l-4.095-1.638a2 2 0 01-1.47-.537L9 20z" /></svg>
                                            </div>
                                            <h3 className="text-lg font-bold">{stack.name}</h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SearchPage;