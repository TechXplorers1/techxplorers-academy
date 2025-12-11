// src/components/Header.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryMap, toKebabCase } from '../utils/categoryHelper';
import { useAuth } from '../AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useCourse } from '../contexts/CourseContext';
import ConfirmationModal from './ConfirmationModal';

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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

const MobileDropdownContent = ({ items, onLinkClick }) => (
    <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200 ml-3">
        {items.map((item, index) => (
            <Link
                key={index}
                to={item.path}
                onClick={onLinkClick}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            >
                {item.name}
            </Link>
        ))}
    </div>
);

const Header = () => {
    const {
        isLoggedIn,
        onLogout,
        userRole
    } = useAuth();

    // Use the correct contexts for data
    const { cartItemsCount } = useStore();
    const { coursesData } = useCourse();

    const [isAllStacksOpen, setIsAllStacksOpen] = React.useState(false);
    const [isForBusinessOpen, setIsForBusinessOpen] = React.useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = React.useState(false);
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const handleMobileLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const handleConfirmLogout = () => {
        onLogout();
        setIsLogoutModalOpen(false);
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    };


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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileMenuOpen) {
            setOpenMobileDropdown(null);
        }
    };

    const handleMobileLinkClick = (path) => {
        if (path) {
            navigate(path);
        }
        toggleMobileMenu();
    };

    const handleMobileDropdownToggle = (menuName) => {
        setOpenMobileDropdown(prev => (prev === menuName ? null : menuName));
    };

    // Safely map coursesData because it might be empty initially
    const allStacksItems = coursesData ? Object.keys(coursesData).map(key => ({
        name: categoryMap[key] || key,
        path: `/all-stacks/${toKebabCase(key)}`
    })) : [];

    const forBusinessItems = [
        { name: 'TX Business', path: '/for-business/TX-business' },
        { name: 'Partner With Us', path: '/for-business/partner-with-us' },
        { name: 'Hire From Us', path: '/for-business/hire-from-us' },
    ];
    const resourcesItems = [
        { name: 'Free Resources', path: '/resources/free-resources' },
        { name: 'Success Stories', path: '/resources/success-stories' },
        { name: 'Masterclass Replays', path: '/resources/masterclass-replays' },
        { name: 'TX Statistics', path: '/resources/TX-statistics' },
        { name: 'Community Events', path: '/resources/community-events' },
    ];
    const moreItems = [
        { name: 'About Us', path: '/more/about-us' },
        { name: 'Become A Mentor or Instructor', path: '/more/become-a-mentor' },
        { name: 'Join TX Teams', path: '/more/join-TX-teams' },
        { name: 'Join TX Projects', path: '/more/join-TX-projects' },
        { name: 'Plans', path: '/more/plans' },
    ];

    const headerClass = "w-full z-40 bg-white shadow-md text-gray-800 border-b border-gray-200";

    return (
        <header className={headerClass}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">

                <Link to="/" className="text-xl font-bold text-blue-600">TX Academy</Link>

                {/* --- Desktop Nav --- */}
                <div className="hidden lg:flex items-center space-x-8">
                    <div className="relative" onMouseEnter={() => handleHover('allStacks', true)} onMouseLeave={() => handleHover('allStacks', false)}>
                        <button className="flex items-center hover:text-blue-600 transition-colors">
                            All Stacks
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isAllStacksOpen} items={allStacksItems} onMouseEnter={() => handleHover('allStacks', true)} onMouseLeave={() => handleHover('allStacks', false)} />
                    </div>
                    <div className="relative" onMouseEnter={() => handleHover('forBusiness', true)} onMouseLeave={() => handleHover('forBusiness', false)}>
                        <button className="flex items-center hover:text-blue-600 transition-colors">
                            For Business
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isForBusinessOpen} items={forBusinessItems} onMouseEnter={() => handleHover('forBusiness', true)} onMouseLeave={() => handleHover('forBusiness', false)} />
                    </div>
                    <div className="relative" onMouseEnter={() => handleHover('resources', true)} onMouseLeave={() => handleHover('resources', false)}>
                        <button className="flex items-center hover:text-blue-600 transition-colors">
                            Resources
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isResourcesOpen} items={resourcesItems} onMouseEnter={() => handleHover('resources', true)} onMouseLeave={() => handleHover('resources', false)} />
                    </div>
                    <div className="relative" onMouseEnter={() => handleHover('more', true)} onMouseLeave={() => handleHover('more', false)}>
                        <button className="flex items-center hover:text-blue-600 transition-colors">
                            More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <DropdownMenu isOpen={isMoreOpen} items={moreItems} onMouseEnter={() => handleHover('more', true)} onMouseLeave={() => handleHover('more', false)} />
                    </div>
                    <Link to="/more/live-classes" className="text-white font-bold py-2 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
                        Live Classes
                    </Link>
                </div>

                {/* --- Desktop Auth Links --- */}
                <div className="hidden lg:flex items-center space-x-4">
                    <button onClick={handleSearchClick} className="hover:text-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    {isLoggedIn && (
                        <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
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
                            {userRole === 'admin' && (
                                <Link to="/admin/dashboard" className="hover:text-blue-600 transition-colors">
                                    Admin Dashboard
                                </Link>
                            )}
                            {userRole === 'instructor' && (
                                <Link to="/instructor/dashboard" className="hover:text-blue-600 transition-colors">
                                    Instructor Dashboard
                                </Link>
                            )}
                            {userRole === 'user' && (
                                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>
                            )}
                            <button onClick={handleLogout} className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="lg:hidden text-2xl text-gray-800"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </nav>

            {/* --- Mobile Menu --- */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white text-gray-800 fixed inset-0 overflow-y-auto z-50">
                    <div className="px-4 pt-4 pb-4 space-y-1 sm:px-6">
                        <div className="flex items-center justify-between h-12">
                            <button
                                onClick={() => { handleSearchClick(); toggleMobileMenu(); }}
                                className="flex-grow flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </button>
                            <button
                                className="ml-4 text-2xl text-gray-600 hover:text-gray-900"
                                onClick={toggleMobileMenu}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>
                        <hr className="my-2" />
                        <div>
                            <button
                                onClick={() => handleMobileDropdownToggle('stacks')}
                                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600"
                            >
                                All Stacks
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${openMobileDropdown === 'stacks' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openMobileDropdown === 'stacks' && (
                                <MobileDropdownContent items={allStacksItems} onLinkClick={toggleMobileMenu} />
                            )}
                        </div>
                        <div>
                            <button
                                onClick={() => handleMobileDropdownToggle('business')}
                                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600"
                            >
                                For Business
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${openMobileDropdown === 'business' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openMobileDropdown === 'business' && (
                                <MobileDropdownContent items={forBusinessItems} onLinkClick={toggleMobileMenu} />
                            )}
                        </div>
                        <div>
                            <button
                                onClick={() => handleMobileDropdownToggle('resources')}
                                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600"
                            >
                                Resources
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${openMobileDropdown === 'resources' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openMobileDropdown === 'resources' && (
                                <MobileDropdownContent items={resourcesItems} onLinkClick={toggleMobileMenu} />
                            )}
                        </div>
                        <div>
                            <button
                                onClick={() => handleMobileDropdownToggle('more')}
                                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600"
                            >
                                More
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform ${openMobileDropdown === 'more' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openMobileDropdown === 'more' && (
                                <MobileDropdownContent items={moreItems} onLinkClick={toggleMobileMenu} />
                            )}
                        </div>
                        <Link to="/more/live-classes" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 font-bold hover:bg-gray-100">Live Classes</Link>

                        <hr className="my-2" />

                        {/* --- Mobile Auth Links --- */}
                        {isLoggedIn ? (
                            <>
                                {userRole === 'admin' && <Link to="/admin/dashboard" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600">Admin Dashboard</Link>}
                                {userRole === 'instructor' && <Link to="/instructor/dashboard" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600">Instructor Dashboard</Link>}
                                {userRole === 'user' && <Link to="/dashboard" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600">Dashboard</Link>}

                                <Link to="/cart" onClick={toggleMobileMenu} className="relative flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600">
                                    Cart
                                    {cartItemsCount > 0 && (
                                        <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>

                                <button
                                    onClick={handleMobileLogout}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={toggleMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-blue-600">Login</Link>
                        )}
                    </div>
                </div>
            )}

            {/* Policy update bar */}
            <div className="bg-cyan-500 text-sm py-2 text-center font-semibold text-white">
                <span className="animate-pulse mr-2">📢</span>
                POLICY UPDATE: Senior leaders from the world's leading research..
            </div>

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
            />
        </header>
    );
};

export default Header;