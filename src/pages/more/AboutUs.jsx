// src/pages/more/AboutUs.jsx
import React from 'react';
import MorePageTemplate from '../MorePageTemplate';
import useInView from '../../hooks/useInView';

const AboutUs = () => {
    const [introRef, introInView] = useInView({ threshold: 0.2 });
    const [sectionsRef, sectionsInView] = useInView({ threshold: 0.2 });
    const [missionRef, missionInView] = useInView({ threshold: 0.2 });
    const [formRef, formInView] = useInView({ threshold: 0.2 });

    const listVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: i => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
            },
        }),
    };

    return (
        <MorePageTemplate title="About Us" breadcrumb="About Us">
            <div ref={introRef} className={`flex flex-col lg:flex-row gap-12 items-center mb-20 transition-all duration-700 ${introInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2">
                    <img src="https://placehold.co/600x400/9b59b6/ffffff?text=About+Us" alt="Smiling student" className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"/>
                </div>
                <div className="lg:w-1/2 space-y-6">
                    <p className="text-purple-600 font-bold text-sm uppercase">About The Stack</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Where Bold Learners Become Limitless Doers.</h2>
                    <p className="text-lg text-gray-700">
                        We believe that the future of work belongs to those who are brave enough to learn, adapt, and build. Digitally Brave is more than a platform; it's a global community dedicated to providing hands-on, project-based learning experiences.
                    </p>
                    <p className="text-lg text-gray-700">
                        Our mission is to bridge the gap between theoretical knowledge and practical, job-ready skills, empowering you to thrive in the digital age.
                    </p>
                </div>
            </div>

            <div ref={sectionsRef} className={`grid md:grid-cols-2 gap-12 mb-20 transition-all duration-700 delay-200 ${sectionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                    <h3 className="text-3xl font-bold text-gray-900">What We Do</h3>
                    <ul className="space-y-4 text-lg">
                        {["Provide Project-Based Training", "Connect Members to Mentors", "Offer Flexible Learning Paths", "Offer Job Readiness Support", "Offer a Global Community", "Curate Cutting-Edge Content"].map((item, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                                <span className="text-purple-600 mr-3 mt-1 text-2xl font-bold flex-shrink-0">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                    <h3 className="text-3xl font-bold text-gray-900">Why We Exist</h3>
                    <ul className="space-y-4 text-lg">
                        {["To Close the Digital Skills Gap", "To Democratize Tech Education", "To Build a Diverse Tech Pipeline", "To Foster a Culture of Continuous Learning"].map((item, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                                <span className="text-purple-600 mr-3 mt-1 text-2xl font-bold flex-shrink-0">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div ref={missionRef} className={`grid md:grid-cols-2 gap-12 mb-20 transition-all duration-700 delay-300 ${missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-purple-600 text-white p-10 rounded-2xl shadow-2xl">
                    <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                    <p className="text-purple-100 text-lg">
                        To empower individuals from all backgrounds to enter and thrive in the digital workforce by providing accessible, project-based learning and an unparalleled global support community.
                    </p>
                </div>
                <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-2xl">
                    <h3 className="text-3xl font-bold mb-4">Our Values</h3>
                    <ul className="space-y-2 text-lg">
                        {["Continuous Learning", "Bold Innovation", "Community-First Approach", "Real-World Impact"].map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                                <span className="text-purple-600 mr-3 text-2xl font-bold flex-shrink-0">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div ref={formRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner transition-all duration-700 delay-400 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Community Signup Form</h3>
                <form className="space-y-8 max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input type="text" placeholder="First Name" className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                        <input type="text" placeholder="Last Name" className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                        <input type="email" placeholder="Email Address" className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                        <input type="tel" placeholder="Phone" className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                    </div>
                    <textarea placeholder="Tell us about yourself" rows="4" className="w-full p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
                    <button type="submit" className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors">
                        Join Our Community
                    </button>
                </form>
            </div>
        </MorePageTemplate>
    );
};

export default AboutUs;