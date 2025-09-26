// import React from 'react';
// import AdminDashboardTemplate from './AdminDashboardTemplate';

// const AnalyticsDashboard = (props) => {
//     // Placeholder data
//     const stats = [
//         { name: 'Total Revenue', value: '$12,450' },
//         { name: 'New Signups (Month)', value: '182' },
//         { name: 'Active Courses', value: '21' },
//         { name: 'Avg. Course Completion', value: '68%' },
//     ];

//     return (
//         <AdminDashboardTemplate {...props} title="Analytics">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {stats.map(stat => (
//                     <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-lg">
//                         <h3 className="text-gray-500 font-semibold">{stat.name}</h3>
//                         <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="bg-white p-8 rounded-2xl shadow-lg">
//                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Revenue Over Time</h2>
//                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
//                     <p className="text-gray-500">[Chart Placeholder]</p>
//                  </div>
//             </div>
//         </AdminDashboardTemplate>
//     );
// };

// export default AnalyticsDashboard;