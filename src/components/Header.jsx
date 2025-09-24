import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryMap, toKebabCase } from '../utils/categoryHelper';

const DropdownMenu = ({ items, isOpen, onMouseEnter, onMouseLeave }) => {
    const menuRef = React.useRef(null);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={menuRef}
            className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 transform origin-top scale-100 opacity-100 z-50"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="py-1">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Header = ({ isLoggedIn, onLogout, cartItemsCount, coursesData }) => {
    const [isAllStacksOpen, setIsAllStacksOpen] = React.useState(false);
    const [isForBusinessOpen, setIsForBusinessOpen] = React.useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = React.useState(false);
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleHover = (dropdownName, isOpen) => {
        setTimeout(() => {
            switch (dropdownName) {
                case 'allStacks':
                    setIsAllStacksOpen(isOpen);
                    break;
                case 'forBusiness':
                    setIsForBusinessOpen(isOpen);
                    break;
                case 'resources':
                    setIsResourcesOpen(isOpen);
                    break;
                case 'more':
                    setIsMoreOpen(isOpen);
                    break;
                default:
                    break;
            }
        }, 100);
    };

    const handleSearchClick = () => {
        navigate('/search');
    };

    // Dynamically generate the "All Stacks" menu items from the coursesData prop
    const allStacksItems = coursesData ? Object.keys(coursesData).map(key => ({
        name: categoryMap[key] || key, // Get the display-friendly name
        path: `/all-stacks/${toKebabCase(key)}` // Create a URL-friendly path
    })) : [];

    const forBusinessItems = [
        { name: 'BraveBusiness', path: '/for-business/Brave-business' },
        { name: 'Partner With Us', path: '/for-business/partner-with-us' },
        { name: 'Hire From Us', path: '/for-business/hire-from-us' },
    ];

    const resourcesItems = [
        { name: 'Free Resources', path: '/resources/free-resources' },
        { name: 'Success Stories', path: '/resources/success-stories' },
        { name: 'Masterclass Replays', path: '/resources/masterclass-replays' },
        { name: 'BraveStatistics', path: '/resources/Brave-statistics' },
        { name: 'Community Events', path: '/resources/community-events' },
    ];

    const moreItems = [
        { name: 'About Us', path: '/more/about-us' },
        { name: 'Become A Mentor or Instructor', path: '/more/become-a-mentor' },
        { name: 'Join BraveTeams', path: '/more/join-Brave-teams' },
        { name: 'Join BraveProjects', path: '/more/join-Brave-projects' },
        { name: 'Plans', path: '/more/plans' },
    ];

    const headerClass = "w-full z-50 bg-[#120D25] text-white";

    return (
        <header className={headerClass}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">TechXplorers Academy</Link>
                <div className="hidden lg:flex items-center space-x-8">
                    <div className="relative" onMouseEnter={() => handleHover('allStacks', true)} onMouseLeave={() => handleHover('allStacks', false)}>
                        <button className="flex items-center hover:text-purple-400 transition-colors">
                            All Stacks
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isAllStacksOpen} items={allStacksItems} onMouseEnter={() => handleHover('allStacks', true)} onMouseLeave={() => handleHover('allStacks', false)} />
                    </div>
                    <div className="relative" onMouseEnter={() => handleHover('forBusiness', true)} onMouseLeave={() => handleHover('forBusiness', false)}>
                        <button className="flex items-center hover:text-purple-400 transition-colors">
                            For Business
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isForBusinessOpen} items={forBusinessItems} onMouseEnter={() => handleHover('forBusiness', true)} onMouseLeave={() => handleHover('forBusiness', false)} />
                    </div>
                    <div className="relative" onMouseEnter={() => handleHover('resources', true)} onMouseLeave={() => handleHover('resources', false)}>
                        <button className="flex items-center hover:text-purple-400 transition-colors">
                            Resources
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isResourcesOpen} items={resourcesItems} onMouseEnter={() => handleHover('resources', true)} onMouseLeave={() => handleHover('resources', false)} />
                    </div>
                    <div className="relative" onMouseEnter={() => handleHover('more', true)} onMouseLeave={() => handleHover('more', false)}>
                        <button className="flex items-center hover:text-purple-400 transition-colors">
                            More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isMoreOpen} items={moreItems} onMouseEnter={() => handleHover('more', true)} onMouseLeave={() => handleHover('more', false)} />
                    </div>
                    <Link to="/more/live-classes" className="text-white font-bold py-2 px-4 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
                        Live Classes
                    </Link>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                    <button onClick={handleSearchClick} className="hover:text-purple-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    {isLoggedIn && (
                        <Link to="/cart" className="relative hover:text-purple-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.185 1.705.707 1.705H17m0 0a2 2 0 100 4 2 2 0 010-4zm-8 2a2 2 0 110 4 2 2 0 010-4z" />
                            </svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    )}
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="hover:text-purple-400 transition-colors">
                                Dashboard
                            </Link>
                            <button onClick={onLogout} className="px-4 py-2 border border-white rounded-full text-white hover:bg-white hover:text-purple-600 transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-purple-400 transition-colors">Login</Link>
                    )}
                </div>
                <button className="lg:hidden text-2xl text-white">
                    ☰
                </button>
            </nav>
            <div className="bg-orange-500 text-sm py-2 text-center font-semibold text-white">
                <span className="animate-pulse mr-2">📢</span>
                POLICY UPDATE: Senior leaders from the world's leading research..
            </div>
        </header>
    );
};

export default Header;