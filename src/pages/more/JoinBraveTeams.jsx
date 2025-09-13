// src/pages/more/JoinBraveTeams.jsx
import React from 'react';
import MorePageTemplate from '../MorePageTemplate';
import useInView from '../../hooks/useInView';

const JoinBraveTeams = () => {
    const [introRef, introInView] = useInView({ threshold: 0.2 });
    const [sectionsRef, sectionsInView] = useInView({ threshold: 0.2 });
    const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.2 });
    const [formRef, formInView] = useInView({ threshold: 0.2 });

    return (
        <MorePageTemplate title="Join BraveTeams" breadcrumb="Join BraveTeams">
            <div ref={introRef} className={`flex flex-col lg:flex-row gap-12 items-center mb-20 transition-all duration-700 ${introInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2 space-y-6">
                    <p className="text-purple-600 font-bold text-sm uppercase">For Learners</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Build Real-World Products, Deliver Real Impact.</h2>
                    <p className="text-lg text-gray-700">
                        BraveTeams is where you get hands-on experience building, shipping, and iterating on real-world digital products. You'll work alongside a team of motivated peers and expert mentors to solve real business challenges.
                    </p>
                </div>
                <div className="lg:w-1/2">
                    <img src="https://placehold.co/600x400/9b59b6/ffffff?text=BraveTeams" alt="Team collaborating on a project" className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"/>
                </div>
            </div>

            <div ref={sectionsRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner mb-20 transition-all duration-700 delay-200 ${sectionsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Types of BraveTeams Projects</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {['Product Design', 'Web Development', 'Data Analytics', 'Marketing', 'Cybersecurity', 'AI & Automation'].map((item, index) => (
                        <div key={index} className="p-6 rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <p className="font-bold text-lg">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div ref={howItWorksRef} className={`bg-white p-12 rounded-2xl shadow-lg mb-20 transition-all duration-700 delay-300 ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">How It Works</h3>
                <ul className="space-y-4 text-lg text-gray-700 max-w-3xl mx-auto list-inside list-disc">
                    <li>Apply to join a team based on your skills and interests.</li>
                    <li>Get matched with a project and a team of peers.</li>
                    <li>Work through sprints, build a product, and deliver to a client.</li>
                    <li>Get mentorship, feedback, and a portfolio-ready project.</li>
                </ul>
            </div>

            <div ref={formRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner transition-all duration-700 delay-400 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Apply to Join a BraveTeam</h3>
                <form className="space-y-8 max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Full Name" className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                        <input type="email" placeholder="Email Address" className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                    </div>
                    <textarea placeholder="Tell us about your experience" rows="4" className="w-full p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
                    <button type="submit" className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors">
                        Submit Application
                    </button>
                </form>
            </div>
        </MorePageTemplate>
    );
};

export default JoinBraveTeams;