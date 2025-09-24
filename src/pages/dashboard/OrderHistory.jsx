import React from 'react';
import { Link } from 'react-router-dom';
import DashboardPageTemplate from '../DashboardPageTemplate';

const OrderHistory = ({ isLoggedIn, onLogout, cartItemsCount, coursesData , user }) => {
    // This is hardcoded data. In a real app, this would be fetched from Firebase.
    const orders = [
        { id: 'ORD-12345', date: '2025-08-20', total: '$299', status: 'Completed', courses: ['Product Strategy', 'UI/UX Design'] },
        { id: 'ORD-67890', date: '2025-07-15', total: '$199', status: 'Completed', courses: ['Marketing'] },
        { id: 'ORD-11223', date: '2025-06-10', total: '$499', status: 'Completed', courses: ['Data Analytics', 'AI Automation'] },
    ];

    const OrderRow = ({ order }) => (
        <tr className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
            <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
            <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
            <td className="py-4 px-6 text-sm text-gray-500">{order.total}</td>
            <td className="py-4 px-6">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.status}
                </span>
            </td>
            <td className="py-4 px-6 text-sm text-gray-500">
                {order.courses.join(', ')}
            </td>
        </tr>
    );

    return (
        <DashboardPageTemplate 
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            cartItemsCount={cartItemsCount}
            title="Order History"
            user={user}
        >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform duration-300 hover:scale-[1.01]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <OrderRow key={order.id} order={order} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {orders.length === 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-[1.01]">
                    <p className="text-lg text-gray-500">You have no past orders.</p>
                </div>
            )}
        </DashboardPageTemplate>
    );
};

export default OrderHistory;