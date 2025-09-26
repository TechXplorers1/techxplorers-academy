import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboardTemplate = ({ isLoggedIn, onLogout, cartItemsCount, coursesData, userRole, title, children }) => {
    return (
        <div className="min-h-screen bg-gray-100 font-inter flex flex-col">
            <Header 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                cartItemsCount={cartItemsCount} 
                coursesData={coursesData}
                userRole={userRole} 
            />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* --- Sticky Sidebar Wrapper --- */}
                    <div className="lg:sticky lg:top-8">
                        <AdminSidebar />
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboardTemplate;