import React from 'react';
import ResourcesPageTemplate from './ResourcesPageTemplate';
import useInView from '../../hooks/useInView';
import NumberCounter from '../../components/NumberCounter'; // Changed to a default import

const BraveStatistics = () => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });

    const stats = [
        { label: "Students Enrolled", value: 10000, suffix: "+" },
        { label: "Courses Completed", value: 25000, suffix: "+" },
        { label: "Mentors & Instructors", value: 200, suffix: "+" },
        { label: "Projects Delivered", value: 5000, suffix: "+" },
    ];

    return (
        <ResourcesPageTemplate title="Brave Statistics" breadcrumb="Brave Statistics">
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Our Impact, By the Numbers.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    We're proud of the growth and success of our community. These statistics represent our commitment to empowering learners worldwide.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-gray-100 p-8 rounded-2xl shadow-lg space-y-2">
                            <div className="text-6xl font-extrabold text-purple-600">
                                <NumberCounter targetNumber={stat.value} duration={2000} />{stat.suffix}
                            </div>
                            <p className="text-xl font-bold text-gray-900">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ResourcesPageTemplate>
    );
};

export default BraveStatistics;