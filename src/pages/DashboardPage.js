import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { FaHome, FaMoneyBillWave, FaUserCircle, FaFileInvoice, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  // Format user's full name
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Member';
  
  // Extract email
  const email = user?.primaryEmailAddress?.emailAddress || '';

  // Handle sign out
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Mock data for the dashboard
  // In a real application, you would fetch this data from your backend API
  const userData = {
    name: fullName,
    email: email,
    memberNumber: 'KMS2022-001',
    balance: 45600,
    savingsGoal: 100000,
    loans: [
      { id: 1, type: 'Personal Loan', amount: 20000, balance: 15000, dueDate: '2025-06-15' },
    ],
    recentTransactions: [
      { id: 1, type: 'Deposit', amount: 5000, date: '2025-03-05', status: 'Completed' },
      { id: 2, type: 'Loan Repayment', amount: -2500, date: '2025-03-01', status: 'Completed' },
      { id: 3, type: 'Deposit', amount: 4000, date: '2025-02-20', status: 'Completed' },
    ]
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <FaHome /> },
    { id: 'loans', label: 'My Loans', icon: <FaMoneyBillWave /> },
    { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
    { id: 'statements', label: 'Statements', icon: <FaFileInvoice /> },
    { id: 'transactions', label: 'Transactions', icon: <FaHistory /> },
  ];

  // Calculate savings progress percentage
  const savingsProgress = Math.min(100, Math.round((userData.balance / userData.savingsGoal) * 100));

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.div 
            className="w-full md:w-64 bg-white rounded-2xl shadow-md overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl" />
                  )}
                </div>
                <h3 className="mt-3 font-bold text-lg">{fullName}</h3>
                <p className="text-blue-100 text-sm">{userData.memberNumber}</p>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                {sidebarItems.map(item => (
                  <li key={item.id}>
                    <button
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
                <li className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    onClick={handleLogout}
                  >
                    <span className="mr-3"><FaSignOutAlt /></span>
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back, {user?.firstName || 'Member'}</h1>
                
                {/* Account Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-600 text-sm font-medium mb-2">Current Balance</h3>
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-gray-800">{formatCurrency(userData.balance)}</span>
                      <span className="ml-2 text-green-500 text-sm">+15% from last month</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Savings Goal</span>
                        <span className="text-sm font-medium">{savingsProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${savingsProgress}%` }}></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {formatCurrency(userData.balance)} of {formatCurrency(userData.savingsGoal)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-600 text-sm font-medium mb-2">Active Loans</h3>
                    {userData.loans.length > 0 ? (
                      userData.loans.map(loan => (
                        <div key={loan.id} className="mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{loan.type}</span>
                            <span className="text-gray-700">{formatCurrency(loan.balance)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>Next payment due: {new Date(loan.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No active loans</p>
                    )}
                    <motion.button 
                      className="mt-4 w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/loan-application')}
                    >
                      Apply for a Loan
                    </motion.button>
                  </div>
                </div>
                
                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Recent Transactions</h3>
                    <button className="text-blue-600 text-sm font-medium hover:underline" onClick={() => setActiveTab('transactions')}>
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.recentTransactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td className="py-3 whitespace-nowrap">{transaction.type}</td>
                            <td className={`py-3 whitespace-nowrap font-medium ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatCurrency(transaction.amount)}
                            </td>
                            <td className="py-3 whitespace-nowrap text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-medium mb-2">Make a Deposit</h3>
                    <p className="text-sm text-gray-600">Add funds to your savings account</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-medium mb-2">Loan Repayment</h3>
                    <p className="text-sm text-gray-600">Make a payment toward your loans</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="font-medium mb-2">Download Statement</h3>
                    <p className="text-sm text-gray-600">Get your monthly account statement</p>
                  </motion.div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Full Name</p>
                        <p className="font-medium">{fullName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Email Address</p>
                        <p className="font-medium">{email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Member Number</p>
                        <p className="font-medium">{userData.memberNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Member Since</p>
                        <p className="font-medium">January 2022</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <h3 className="font-bold mb-3">Account Settings</h3>
                      <button className="text-blue-600 hover:underline">
                        Manage your Clerk profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'loans' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Loans</h1>
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Active Loans</h2>
                  {/* Loan details content */}
                </div>
              </div>
            )}
            
            {activeTab === 'statements' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Statements</h1>
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Monthly Statements</h2>
                  {/* Statements listing */}
                </div>
              </div>
            )}
            
            {activeTab === 'transactions' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h1>
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">All Transactions</h2>
                  {/* Transactions listing */}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;