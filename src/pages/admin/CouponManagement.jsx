import React from 'react';
import AdminDashboardTemplate from './AdminDashboardTemplate';

const CouponManagement = (props) => {
    // Placeholder data
    const coupons = [
        { id: 1, code: 'WELCOME10', discount: '10%', status: 'Active' },
        { id: 2, code: 'SUMMER25', discount: '25%', status: 'Active' },
        { id: 3, code: 'OLDPROMO', discount: '$20', status: 'Expired' },
    ];

    return (
        <AdminDashboardTemplate {...props} title="Coupon Management">
             <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">All Coupons</h2>
                    <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Create New Coupon
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Code</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Discount</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b font-mono">{coupon.code}</td>
                                    <td className="py-3 px-4 border-b">{coupon.discount}</td>
                                    <td className="py-3 px-4 border-b">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${coupon.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {coupon.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <button className="text-purple-600 hover:underline font-semibold">Edit</button>
                                        <button className="text-red-600 hover:underline font-semibold ml-4">Delete</button>
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

export default CouponManagement;