// src/pages/more/JoinBraveProjects.jsx
import React from 'react';
import MorePageTemplate from '../MorePageTemplate';
// Assuming this is a custom hook or alias for the one from framer-motion
import useInView from '../../hooks/useInView'; 

// --- WHATSAPP CONFIGURATION ---
const WHATSAPP_NUMBER = '+919618108329';
const FORM_TITLE = 'Project Join Inquiry (Learner)';
// ------------------------------

const JoinBraveProjects = ({ isLoggedIn, onLogout, cartItemsCount }) => {
    // FIX: Removed the 'new' keyword from the hook calls
    const [introRef, introInView] = useInView({ threshold: 0.2 });
    const [whatYoullGetRef, whatYoullGetInView] = useInView({ threshold: 0.1 });
    // CORRECTED LINE: The 'new' keyword caused the 'useInView is not a constructor' error.
    const [projectTypesRef, projectTypesInView] = useInView({ threshold: 0.1 }); 
    const [howToJoinRef, howToJoinInView] = useInView({ threshold: 0.1 });
    const [formRef, formInView] = useInView({ threshold: 0.1 });

    // --- WHATSAPP SUBMISSION HANDLER ---
    const handleWhatsAppSubmit = (event) => {
        event.preventDefault(); // Stop the default form submission

        const formData = new FormData(event.target);
        // Start with the form title as a bold heading on a new line
        let message = `*${FORM_TITLE}*\n\n`; 

        // Collect and format data with headings
        const fields = [
            { label: 'Full Name', name: 'fullName' },
            { label: 'Email Address', name: 'emailAddress' },
            { label: 'Motivation/Experience', name: 'motivation' }
        ];

        fields.forEach(field => {
            const value = formData.get(field.name) || 'N/A';
            // Format each field as a heading and its value: *Label:*\nValue\n\n
            message += `*${field.label}:*\n${value}\n\n`;
        });

        // Clean the number for the wa.me URL (remove '+', ' ', etc.)
        const cleanNumber = WHATSAPP_NUMBER.replace(/\+/g, '').replace(/\s/g, '');
        
        // URL-encode the message so it's safe for the URL query string
        const encodedMessage = encodeURIComponent(message);
        
        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        
        // Open the WhatsApp chat
        window.open(whatsappUrl, '_blank');
    };
    // -----------------------------------
    
    return (
        <MorePageTemplate title="Join a Project" breadcrumb="Join a Project" isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount}>
            <div ref={introRef} className={`flex flex-col lg:flex-row gap-12 items-center mb-20 transition-all duration-700 ${introInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2">
                    <img src="https://placehold.co/600x400/9b59b6/ffffff?text=Projects" alt="Team working around a table" className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"/>
                </div>
                <div className="lg:w-1/2 space-y-6">
                    <p className="text-purple-600 font-bold text-sm uppercase">For Learners</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Step Into Real-World Digital Experience</h2>
                    <p className="text-lg text-gray-700">
                        At TX Academy, our projects are a sandbox for your skills. You'll join a dedicated team to tackle real-world challenges, build impactful products, and gain portfolio-worthy experience that employers notice.
                    </p>
                </div>
            </div>

            <div ref={whatYoullGetRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner mb-20 transition-all duration-700 delay-200 ${whatYoullGetInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">What You'll Get When You Join a Project:</h3>
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 max-w-3xl mx-auto">
                    <li>**Real Experience**: Each sprint is centered on a live business project.</li>
                    <li>**Defined Roles**: Choose your role—Business Analyst, UX Designer, Developer, PM, etc.</li>
                    <li>**Portfolio Boost**: Deliver work that shows off your skills to future employers.</li>
                    <li>**Mentorship & Feedback**: Our expert mentors are here to help.</li>
                    <li>**Skill Development**: Learn new tools and apply your skills in a team environment.</li>
                    <li>**Portfolio Certification**: Create artifacts (e.g., user stories, wireframes, dashboards) that employers value.</li>
                    <li>**Performance Feedback**: Earn badges and ratings to showcase your skills.</li>
                </ul>
            </div>

            <div ref={projectTypesRef} className={`bg-white p-12 rounded-2xl shadow-lg mb-20 transition-all duration-700 delay-300 ${projectTypesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Project Types You Can Join:</h3>
                <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 max-w-3xl mx-auto">
                    <li>**Individual Projects**: Work on a smaller project with a mentor and weekly check-ins.</li>
                    <li>**Team Projects**: Join a team to build a complete product from idea to launch.</li>
                    <li>**Freelance Projects**: Work on a client's project with mentorship and guidance.</li>
                    <li>**Internal Projects**: Help build our platform or internal tools.</li>
                </ul>
            </div>
            
            <div ref={howToJoinRef} className={`bg-gray-100 p-12 rounded-2xl shadow-inner mb-20 transition-all duration-700 delay-400 ${howToJoinInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">How To Join</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {['Pick a Stack', 'Join a Sprint', 'Complete the Project', 'Earn a Badge'].map((step, index) => (
                        <div key={index} className="p-6 rounded-xl bg-white shadow-md text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="w-16 h-16 rounded-full bg-purple-600 text-white mx-auto flex items-center justify-center font-bold text-3xl mb-4">
                                {index + 1}
                            </div>
                            <p className="font-bold text-lg">{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div ref={formRef} className={`bg-white p-12 rounded-2xl shadow-lg transition-all duration-700 delay-500 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl font-extrabold text-center mb-10">Join Our Next Project - Submit via WhatsApp</h3>
                {/* UPDATED: Added onSubmit handler */}
                <form onSubmit={handleWhatsAppSubmit} className="space-y-8 max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* UPDATED: Added name and required attributes */}
                        <input type="text" name="fullName" placeholder="Full Name (Required)" required className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                        {/* UPDATED: Added name and required attributes */}
                        <input type="email" name="emailAddress" placeholder="Email Address (Required)" required className="p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"/>
                    </div>
                    {/* UPDATED: Added name attribute */}
                    <textarea name="motivation" placeholder="Why do you want to join? (Tell us about your skills)" rows="4" className="w-full p-4 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
                    {/* UPDATED: Button text */}
                    <button type="submit" className="w-full py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors">
                        Send Application via WhatsApp
                    </button>
                </form>
            </div>
        </MorePageTemplate>
    );
};

export default JoinBraveProjects;``