import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const LiveClassRecordings = ({ isLoggedIn, onLogout, cartItemsCount, liveClassesData }) => {
    const { classId } = useParams();
    const liveClass = liveClassesData.find(cls => cls.id === classId);

    if (!liveClass) {
        return (
            <DashboardPageTemplate isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} title="Live Class Not Found">
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
        <DashboardPageTemplate isLoggedIn={isLoggedIn} onLogout={onLogout} cartItemsCount={cartItemsCount} title={liveClass.title}>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{liveClass.title} Recordings</h3>
                <p className="text-gray-600 mb-6">{liveClass.description}</p>
                <div className="space-y-8">
                    {liveClass.recordings.map((recording) => (
                        <div key={recording.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                            <h4 className="text-xl font-semibold mb-3 text-gray-800">{recording.title}</h4>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    className="w-full rounded-xl"
                                    height="400"
                                    src={recording.videoUrl}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={recording.title}
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardPageTemplate>
    );
};

export default LiveClassRecordings;