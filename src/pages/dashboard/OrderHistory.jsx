import React from 'react';
import DashboardPageTemplate from '../DashboardPageTemplate';

// MODIFIED: Accept orderHistory as prop
const OrderHistory = ({ isLoggedIn, onLogout, cartItemsCount, user, orderHistory }) => {
    
    // Use the orderHistory prop, which is fetched and sorted in AuthContext
    const orders = orderHistory; 

    const OrderRow = ({ order }) => (
        <tr className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
            {/* Display the Order ID. We use a slice to make it shorter/cleaner as per App.jsx */}
            <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id || order.userId.slice(0, 5) + '...' + order.date.split('T')[0].replace(/-/g, '')}</td>
            {/* Format the ISO date into a more readable format */}
            <td className="py-4 px-6 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td> 
            {/* Display the total */}
            <td className="py-4 px-6 text-sm text-gray-500">${order.total}</td>
            <td className="py-4 px-6">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.status}
                </span>
            </td>
            {/* List the courses purchased in the order */}
            <td className="py-4 px-6 text-sm text-gray-500">
                {order.courses.map(c => c.title).join(', ')}
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
                                <OrderRow key={order.id || order.date} order={order} />
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