// src/pages/more/Plans.jsx
import React from 'react';
import MorePageTemplate from '../MorePageTemplate';
import useInView from '../../hooks/useInView';

const Plans = () => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });
    const [card1Ref, card1InView] = useInView({ threshold: 0.2 });
    const [card2Ref, card2InView] = useInView({ threshold: 0.2 });
    const [card3Ref, card3InView] = useInView({ threshold: 0.2 });

    const checkIcon = <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
    const xIcon = <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;

    return (
        <MorePageTemplate title="Plans" breadcrumb="Plans">
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Choose The Plan That's Right For You.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    Whether you're an individual learner or a business looking to upskill your team, we have a flexible plan to meet your needs.
                </p>

                <div className="grid md:grid-cols-3 gap-8 w-full mt-12">
                    <div ref={card1Ref} className={`bg-gray-100 p-10 rounded-2xl shadow-lg space-y-6 transition-all duration-500 ${card1InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <h3 className="text-3xl font-extrabold text-gray-900">BraveAccess+</h3>
                        <p className="text-gray-500 text-sm">Perfect for beginners and those exploring new skills.</p>
                        <p className="text-5xl font-extrabold text-orange-500">$99<span className="text-sm font-normal text-gray-500">/mo</span></p>
                        <ul className="text-left space-y-3 text-gray-700">
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Access to 1 BraveStack/month</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Project templates & tools</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Up to $49/mo stack tool access</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Stack replays</li>
                            <li className="flex items-center"><span className="mr-2">{xIcon}</span> 1-on-1 coaching</li>
                            <li className="flex items-center"><span className="mr-2">{xIcon}</span> Personalized roadmap</li>
                        </ul>
                        <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                            Get Started
                        </button>
                    </div>

                    <div ref={card2Ref} className={`bg-purple-600 text-white p-10 rounded-2xl shadow-2xl space-y-6 transition-all duration-500 delay-200 ${card2InView ? 'opacity-100 scale-105' : 'opacity-0 scale-90'}`}>
                        <h3 className="text-3xl font-extrabold">BraveMentor</h3>
                        <p className="text-purple-200 text-sm">Unlock all courses, mentorship, and real-world projects.</p>
                        <p className="text-5xl font-extrabold">$199<span className="text-sm font-normal">/mo</span></p>
                        <ul className="text-left space-y-3">
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Access to 1 BraveStack/month</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Project templates & tools</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Up to $49/mo stack tool access</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Stack replays</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> 1-on-1 coaching (1/month)</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Personalized roadmap</li>
                        </ul>
                        <button className="w-full py-4 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                            Get Started
                        </button>
                    </div>

                    <div ref={card3Ref} className={`bg-gray-100 p-10 rounded-2xl shadow-lg space-y-6 transition-all duration-500 delay-400 ${card3InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <h3 className="text-3xl font-extrabold text-gray-900">BraveMentor</h3>
                        <p className="text-gray-500 text-sm">Custom solutions for companies of all sizes.</p>
                        <p className="text-5xl font-extrabold text-orange-500">$299<span className="text-sm font-normal text-gray-500">/mo</span></p>
                        <ul className="text-left space-y-3 text-gray-700">
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Access to 1 BraveStack/month</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Project templates & tools</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Tech tools included (+ upgrades)</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Stack replays</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> 1-on-1 coaching (Unlimited)</li>
                            <li className="flex items-center"><span className="mr-2">{checkIcon}</span> Personalized roadmap</li>
                        </ul>
                        <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </MorePageTemplate>
    );
};

export default Plans;