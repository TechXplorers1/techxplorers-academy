import React, { useState, useEffect } from 'react';
import MorePageTemplate from '../MorePageTemplate';
import useInView from '../../hooks/useInView';
import { db } from '../../firebase';
import { ref, set, onValue } from 'firebase/database';

const BecomeAMentor = (props) => {
    const [introRef, introInView] = useInView({ threshold: 0.2 });
    const [whyRef, whyInView] = useInView({ threshold: 0.1 });
    const [waysRef, waysInView] = useInView({ threshold: 0.1 });
    const [compensationRef, compensationInView] = useInView({ threshold: 0.1 });
    const [formRef, formInView] = useInView({ threshold: 0.1 });

    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', website: '', background: '' });
    const [applicationStatus, setApplicationStatus] = useState(null); // null, 'new', 'pending', or 'submitted'
    const { user } = props;

    useEffect(() => {
        if (user?.uid) {
            const applicationRef = ref(db, `instructorApplications/${user.uid}`);
            const unsubscribe = onValue(applicationRef, (snapshot) => {
                if (snapshot.exists()) {
                    setApplicationStatus('pending');
                } else {
                    setApplicationStatus('new');
                }
            });
            return () => unsubscribe();
        } else {
            setApplicationStatus('new');
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, fullName: user.name, email: user.email }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.uid) {
            alert("Please log in to submit an application.");
            return;
        }

        const applicationRef = ref(db, `instructorApplications/${user.uid}`);
        const applicationData = {
            ...formData,
            uid: user.uid,
            status: 'pending',
            appliedAt: new Date().toISOString()
        };

        try {
            await set(applicationRef, applicationData);
            setApplicationStatus('submitted');
        } catch (error) {
            console.error("Error submitting application:", error);
            alert(`There was an error submitting your application: ${error.message}`);
        }
    };

    return (
        <MorePageTemplate {...props} title="Become An Instructor" breadcrumb="Become An Instructor">
            <div ref={introRef} className={`flex flex-col lg:flex-row gap-12 items-center mb-20 transition-all duration-700 ${introInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2 space-y-6">
                    <p className="text-purple-600 font-bold text-sm uppercase">For Leaders</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Help Bold Learners Thrive In Tech And Business</h2>
                    <p className="text-lg text-gray-700">
                        As a mentor or instructor, you have the power to shape the next generation of tech leaders. Share your expertise, guide aspiring professionals, and build a legacy by contributing to a community of bold, innovative thinkers.
                    </p>
                </div>
                <div className="lg:w-1/2">
                    <img src="https://placehold.co/600x400/9b59b6/ffffff?text=Mentor" alt="Mentor and student discussing" className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"/>
                </div>
            </div>

            <div ref={whyRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner mb-20 transition-all duration-700 delay-200 ${whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Why Join As A Mentor Or Instructor?</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {['Shape the Future', 'Expand Your Network', 'Gain Visibility', 'Earn Income'].map((item, index) => (
                        <div key={index} className="text-center p-6 rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 rounded-full bg-purple-600 text-white mx-auto flex items-center justify-center font-bold text-3xl mb-4">
                                {index + 1}
                            </div>
                            <p className="font-bold text-lg">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div ref={waysRef} className={`bg-white p-12 rounded-2xl shadow-lg mb-20 transition-all duration-700 delay-300 ${waysInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Ways To Contribute</h3>
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 max-w-3xl mx-auto">
                    <li>**Lead A Stack**: Teach a cohort through a project-based curriculum.</li>
                    <li>**Mentorship**: Guide a student one-on-one or in small groups.</li>
                    <li>**Masterclasses**: Host a one-time workshop on a specific topic.</li>
                    <li>**Content Creation**: Develop learning modules, tutorials, or resources.</li>
                </ul>
            </div>

            <div ref={compensationRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner mb-20 transition-all duration-700 delay-400 ${compensationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Compensation & Perks</h3>
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 max-w-3xl mx-auto">
                    <li>Competitive stipends and revenue share.</li>
                    <li>Mentorship fee for 1:1 sessions.</li>
                    <li>Networking opportunities with top tech professionals.</li>
                    <li>Platform to showcase your expertise and build your brand.</li>
                </ul>
            </div>
            
            <div ref={formRef} className={`bg-white p-12 rounded-2xl shadow-lg transition-all duration-700 delay-500 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-4xl font-extrabold text-center mb-10">Apply To Mentor Or Teach</h3>
                    
                    {!user ? (
                        <div className="text-center p-8 bg-gray-100 rounded-lg">
                            <p className="text-lg text-gray-700">You must be logged in to apply.</p>
                        </div>
                    ) : applicationStatus === 'pending' || applicationStatus === 'submitted' ? (
                        <div className="text-center p-8 bg-green-50 border-l-4 border-green-400 rounded-lg">
                            <h4 className="text-2xl font-bold text-green-800">Application Submitted!</h4>
                            <p className="mt-2 text-green-700">Thank you for your interest. We are reviewing your application and will be in touch soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName" name="fullName" value={formData.fullName} readOnly className="w-full p-4 bg-gray-100 border rounded-lg cursor-not-allowed"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} readOnly className="w-full p-4 bg-gray-100 border rounded-lg cursor-not-allowed"/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(Optional)" className="w-full p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                                </div>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Portfolio or LinkedIn URL</label>
                                    <input type="url" id="website" name="website" value={formData.website} onChange={handleInputChange} placeholder="(Optional)" className="w-full p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">Professional Background & Expertise</label>
                                <textarea id="background" name="background" value={formData.background} onChange={handleInputChange} placeholder="Tell us what you're passionate about teaching..." rows="5" className="w-full p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" required></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors">
                                Submit Application
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </MorePageTemplate>
    );
};

export default BecomeAMentor;