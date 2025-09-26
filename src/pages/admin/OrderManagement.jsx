import React from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const OrderManagement = (props) => {
    // Placeholder data
    const orders = [
        { id: 'ORD001', user: 'chaveenreddy@gmail.com', date: '2025-09-25', total: '$129.99', items: 1 },
        { id: 'ORD002', user: 'naresh@gmail.com', date: '2025-09-24', total: '$229.99', items: 1 },
    ];

    return (
        <AdminDashboardTemplate {...props} title="Order Management">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Order ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">User Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Total</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{order.id}</td>
                                    <td className="py-3 px-4 border-b">{order.user}</td>
                                    <td className="py-3 px-4 border-b">{order.date}</td>
                                    <td className="py-3 px-4 border-b">{order.total}</td>
                                    <td className="py-3 px-4 border-b">
                                        <button className="text-purple-600 hover:underline font-semibold">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboardTemplate>
    );
};

export default OrderManagement;