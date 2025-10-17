import React, { useState, useEffect } from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';
import { ref, onValue } from "firebase/database";
import { db } from '../../firebase';

// NEW COMPONENT: Order Details Modal
const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4">
            <div className="w-full max-w-2xl bg-white text-gray-900 rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h3 className="text-2xl font-bold">Order Details: {order.id || 'N/A'}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    <p><strong>User Email:</strong> {order.userEmail}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                    <p><strong>Total Amount:</strong> <span className="font-bold text-lg text-green-600">${order.total}</span></p>
                    <p><strong>Status:</strong> <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{order.status}</span></p>
                </div>

                <h4 className="text-xl font-bold mt-4 mb-3 border-t pt-4">Purchased Courses ({order.courses.length})</h4>
                <div className="space-y-3">
                    {order.courses.map((course, index) => (
                        <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg border">
                            <span className="font-semibold text-gray-800">{course.title}</span>
                            <span className="text-sm text-gray-600">${(course.price || 0).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const OrderManagement = (props) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // NEW STATE: To store the currently selected order for the modal
    const [selectedOrder, setSelectedOrder] = useState(null); 

    useEffect(() => {
        // Fetch all orders from the global 'orders' collection
        const ordersRef = ref(db, 'orders');
        
        const unsubscribe = onValue(ordersRef, (snapshot) => {
            setLoading(true);
            const data = snapshot.val();
            if (data) {
                // Flatten the object of orders into an array
                const ordersArray = Object.values(data);
                // Sort by date descending
                ordersArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(ordersArray);
                setError(null);
            } else {
                setOrders([]);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firebase fetch error for orders:", err);
            setError("Failed to load orders from the database.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    
    // Handler to show the modal with order details
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    if (loading) {
        return (
            <AdminDashboardTemplate {...props} title="Order Management">
                <div className="text-center py-10 text-gray-500">Loading orders...</div>
            </AdminDashboardTemplate>
        );
    }

    if (error) {
        return (
            <AdminDashboardTemplate {...props} title="Order Management">
                <div className="text-center py-10 text-red-500">{error}</div>
            </AdminDashboardTemplate>
        );
    }

    return (
        <AdminDashboardTemplate {...props} title="Order Management">
            {/* Render the modal if an order is selected */}
            <OrderDetailsModal 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)} 
            />

            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders ({orders.length})</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Order ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">User Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Total</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Items</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id || order.date} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b text-sm">{order.id || order.userId.slice(0, 5) + '...'}</td>
                                    <td className="py-3 px-4 border-b text-sm">{order.userEmail}</td>
                                    <td className="py-3 px-4 border-b text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 border-b text-sm">${order.total}</td>
                                    <td className="py-3 px-4 border-b text-sm">{order.courses.length}</td>
                                    <td className="py-3 px-4 border-b">
                                        <button 
                                            onClick={() => handleViewDetails(order)} // Call handler on click
                                            className="text-purple-600 hover:underline font-semibold"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {orders.length === 0 && (
                    <div className="text-center py-6 text-gray-500">No orders found.</div>
                )}
            </div>
        </AdminDashboardTemplate>
    );
};

export default OrderManagement;