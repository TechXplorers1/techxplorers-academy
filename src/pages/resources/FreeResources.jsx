import React from 'react';
import ResourcesPageTemplate from './ResourcesPageTemplate';
import useInView from '../../hooks/useInView';

const FreeResources = () => {
    const [contentRef, contentInView] = useInView({ threshold: 0.2 });

    return (
        <ResourcesPageTemplate title="Free Resources" breadcrumb="Free Resources">
            <div ref={contentRef} className={`flex flex-col items-center text-center space-y-8 transition-all duration-700 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Unlock Your Potential with Free Learning.</h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                    Dive into our curated collection of free resources, including tutorials, guides, and tools designed to help you start or advance your tech career.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-12">
                    <div className="bg-gray-100 p-8 rounded-2xl shadow-lg space-y-4">
                        <h3 className="text-2xl font-bold">Free Stacks</h3>
                        <p className="text-gray-500">Access to our beginner-friendly courses for free.</p>
                        <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700">Explore</button>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-2xl shadow-lg space-y-4">
                        <h3 className="text-2xl font-bold">E-books & Guides</h3>
                        <p className="text-gray-500">Download free guides on various tech topics.</p>
                        <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700">Download</button>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-2xl shadow-lg space-y-4">
                        <h3 className="text-2xl font-bold">Templates</h3>
                        <p className="text-gray-500">Project templates to kickstart your work.</p>
                        <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700">Browse</button>
                    </div>
                </div>
            </div>
        </ResourcesPageTemplate>
    );
};

export default FreeResources;