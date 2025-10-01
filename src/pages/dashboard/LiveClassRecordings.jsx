import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const LiveClassRecordings = ({ isLoggedIn, onLogout, cartItemsCount, coursesData, user, liveClassesData }) => {
    const { classId } = useParams();
    const [liveClass, setLiveClass] = useState(null);
    const [currentRecording, setCurrentRecording] = useState(null);

    useEffect(() => {
        // Find the specific live class from the data passed in props.
        const foundClass = liveClassesData.find(cls => cls.id === classId);
        setLiveClass(foundClass);

        // This is a great check! It ensures 'recordings' exists and has content
        // before trying to set the first video as the current one.
        if (foundClass && foundClass.recordings && foundClass.recordings.length > 0) {
            setCurrentRecording(foundClass.recordings[0]);
        }
    }, [classId, liveClassesData]); // Added classId to dependencies for correctness

    const handleRecordingClick = (recording) => {
        setCurrentRecording(recording);
    };

    // This is a good way to handle cases where the class isn't found.
    if (!liveClass) {
        return (
            <DashboardPageTemplate isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} title="Live Class Not Found" user={user}>
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Class Not Found</h3>
                    <p className="text-gray-600">The live class you are looking for does not exist or you may not be registered for it.</p>
                    <Link to="/dashboard/my-live-classes" className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors">
                        Back to My Live Classes
                    </Link>
                </div>
            </DashboardPageTemplate>
        );
    }

    return (
        <DashboardPageTemplate isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} coursesData={coursesData} title={liveClass.title} user={user}>
            <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-300px)] -m-8">
                {/* Main Video Player Area */}
                <div className="lg:flex-grow p-6 md:p-8 bg-gray-50 flex flex-col justify-center">
                    {currentRecording ? (
                        <div className="w-full h-full aspect-video">
                            <iframe
                                className="w-full h-full rounded-xl shadow-2xl bg-black"
                                src={currentRecording.videoUrl}
                                title={currentRecording.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="text-gray-600 text-center p-8 bg-white rounded-lg shadow">
                            <h2 className="text-2xl font-bold">Welcome!</h2>
                            <p className="mt-2">Select a recording from the sidebar to start watching.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar with Recordings List */}
                <aside className="lg:w-96 bg-white shadow-lg p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Class Recordings</h2>
                    <p className="text-gray-600 mb-6 text-sm">{liveClass.description}</p>
                    
                    {/* This check correctly prevents the .map() error if recordings don't exist */}
                    {liveClass.recordings && liveClass.recordings.length > 0 ? (
                        <ul className="space-y-2">
                            {liveClass.recordings.map(rec => (
                                <li
                                    key={rec.id}
                                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                        currentRecording && currentRecording.id === rec.id ? 'bg-purple-100 text-purple-800 font-medium' : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleRecordingClick(rec)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    <span>{rec.title}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <p className="text-gray-500 italic">No recordings are available for this class yet.</p>
                    )}
                     <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link to="/dashboard/my-live-classes" className="text-sm text-purple-600 font-semibold hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to My Live Classes
                        </Link>
                    </div>
                </aside>
            </div>
        </DashboardPageTemplate>
    );
};

export default LiveClassRecordings;