import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { 
  FaHome, 
  FaMoneyBillWave, 
  FaUserCircle, 
  FaFileInvoice, 
  FaHistory, 
  FaSignOutAlt,
  FaDownload,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaChartLine,
  FaInfoCircle
} from 'react-icons/fa';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositType, setDepositType] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  // Format user's full name
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Member';
  
  // Extract email
  const email = user?.primaryEmailAddress?.emailAddress || '';

  // Handle sign out
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // In a real application, you would fetch this data from your backend API
  // Mock data for the dashboard
  const userData = {
    name: fullName,
    email: email,
    memberNumber: 'KMS2022-001',
    phoneNumber: '+254712345678',
    idNumber: '12345678',
    memberSince: 'January 2022',
    balance: 45600,
    savingsGoal: 100000,
    shareCapital: {
      paid: 3000,
      totalRequired: 5000,
      dueDate: '2023-01-15',
    },
    monthlyInvestment: {
      currentMonth: 1000,
      lastPaymentDate: '2025-02-15',
      totalInvested: 25000,
    },
    loans: [
      { 
        id: 1, 
        type: 'Personal Loan', 
        amount: 20000, 
        balance: 15000, 
        dueDate: '2025-06-15', 
        interestRate: 12,
        monthlyPayment: 2500,
        approvalDate: '2024-12-15',
        status: 'Active'
      },
    ],
    recentTransactions: [
      { id: 1, type: 'Monthly Investment', amount: 1000, date: '2025-03-05', status: 'Completed', reference: 'INV-2503' },
      { id: 2, type: 'Loan Repayment', amount: -2500, date: '2025-03-01', status: 'Completed', reference: 'LNP-2503' },
      { id: 3, type: 'Share Capital', amount: 1000, date: '2025-02-20', status: 'Completed', reference: 'SHR-2502' },
      { id: 4, type: 'Monthly Investment', amount: 1000, date: '2025-02-15', status: 'Completed', reference: 'INV-1502' },
      { id: 5, type: 'Loan Repayment', amount: -2500, date: '2025-02-01', status: 'Completed', reference: 'LNP-0102' },
      { id: 6, type: 'Share Capital', amount: 1000, date: '2025-01-20', status: 'Completed', reference: 'SHR-2001' }
    ],
    allTransactions: [
      { id: 1, type: 'Monthly Investment', amount: 1000, date: '2025-03-05', status: 'Completed', reference: 'INV-2503' },
      { id: 2, type: 'Loan Repayment', amount: -2500, date: '2025-03-01', status: 'Completed', reference: 'LNP-2503' },
      { id: 3, type: 'Share Capital', amount: 1000, date: '2025-02-20', status: 'Completed', reference: 'SHR-2502' },
      { id: 4, type: 'Monthly Investment', amount: 1000, date: '2025-02-15', status: 'Completed', reference: 'INV-1502' },
      { id: 5, type: 'Loan Repayment', amount: -2500, date: '2025-02-01', status: 'Completed', reference: 'LNP-0102' },
      { id: 6, type: 'Share Capital', amount: 1000, date: '2025-01-20', status: 'Completed', reference: 'SHR-2001' },
      { id: 7, type: 'Monthly Investment', amount: 1000, date: '2025-01-15', status: 'Completed', reference: 'INV-1501' },
      { id: 8, type: 'Loan Repayment', amount: -2500, date: '2025-01-01', status: 'Completed', reference: 'LNP-0101' },
      { id: 9, type: 'Share Capital', amount: 1000, date: '2024-12-20', status: 'Completed', reference: 'SHR-2012' },
      { id: 10, type: 'Monthly Investment', amount: 1000, date: '2024-12-15', status: 'Completed', reference: 'INV-1512' },
      { id: 11, type: 'Loan Disbursement', amount: 20000, date: '2024-12-15', status: 'Completed', reference: 'LND-1512' },
      { id: 12, type: 'Share Capital', amount: 1000, date: '2024-12-10', status: 'Completed', reference: 'SHR-1012' }
    ],
    statements: [
      { id: 1, period: 'March 2025', date: '2025-03-31', downloadUrl: '#' },
      { id: 2, period: 'February 2025', date: '2025-02-28', downloadUrl: '#' },
      { id: 3, period: 'January 2025', date: '2025-01-31', downloadUrl: '#' },
      { id: 4, period: 'December 2024', date: '2024-12-31', downloadUrl: '#' },
      { id: 5, period: 'November 2024', date: '2024-11-30', downloadUrl: '#' },
      { id: 6, period: 'October 2024', date: '2024-10-31', downloadUrl: '#' }
    ],
    loanHistory: [
      { 
        id: 1, 
        type: 'Personal Loan', 
        amount: 20000, 
        balance: 15000, 
        dueDate: '2025-06-15', 
        interestRate: 12,
        monthlyPayment: 2500,
        approvalDate: '2024-12-15',
        status: 'Active',
        payments: 3,
        totalPayments: 12
      },
      { 
        id: 2, 
        type: 'Emergency Loan', 
        amount: 10000, 
        balance: 0, 
        dueDate: '2024-09-15', 
        interestRate: 10,
        monthlyPayment: 1750,
        approvalDate: '2024-03-15',
        status: 'Paid',
        payments: 6,
        totalPayments: 6
      }
    ],
    availableLoanTypes: [
      { 
        type: 'Personal Loan', 
        maxAmount: 50000, 
        interestRate: 12, 
        maxTerm: 24,
        eligibility: 'Member for at least 3 months with consistent monthly investments'
      },
      {
        type: 'Emergency Loan',
        maxAmount: 20000,
        interestRate: 10,
        maxTerm: 12,
        eligibility: 'Member for at least 6 months with consistent monthly investments'
      },
      {
        type: 'Development Loan',
        maxAmount: 100000,
        interestRate: 14,
        maxTerm: 36,
        eligibility: 'Member for at least 12 months with consistent monthly investments'
      }
    ]
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <FaHome /> },
    { id: 'investments', label: 'Investments', icon: <FaPiggyBank /> },
    { id: 'loans', label: 'My Loans', icon: <FaMoneyBillWave /> },
    { id: 'apply', label: 'Apply for Loan', icon: <FaHandHoldingUsd /> },
    { id: 'transactions', label: 'Transactions', icon: <FaHistory /> },
    { id: 'statements', label: 'Statements', icon: <FaFileInvoice /> },
    { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
  ];

  // Calculate savings progress percentage
  const savingsProgress = Math.min(100, Math.round((userData.balance / userData.savingsGoal) * 100));
  
  // Calculate share capital progress
  const shareCapitalProgress = Math.min(100, Math.round((userData.shareCapital.paid / userData.shareCapital.totalRequired) * 100));

  // Handle deposit modal
  const openDepositModal = (type) => {
    setDepositType(type);
    setDepositAmount('');
    setShowDepositModal(true);
  };

  // Handle deposit submission
  const handleSubmitDeposit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDepositModal(false);
      
      // Show success message (in a real app, you'd update the state with the new balance)
      alert(`${depositType} deposit of ${formatCurrency(depositAmount)} submitted successfully.`);
    }, 1500);
  };

  // Generate monthly investment due date
  const getNextDueDate = () => {
    const lastPaymentDate = new Date(userData.monthlyInvestment.lastPaymentDate);
    const nextDueDate = new Date(lastPaymentDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);
    return nextDueDate.toLocaleDateString();
  };

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
            {/* Overview Tab */}
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
                      onClick={() => setActiveTab('apply')}
                    >
                      Apply for a Loan
                    </motion.button>
                  </div>
                </div>
                
                {/* Investment Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">Share Capital</h3>
                      <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Required: {formatCurrency(userData.shareCapital.totalRequired)}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <span className="text-2xl font-bold text-gray-800">{formatCurrency(userData.shareCapital.paid)}</span>
                      <span className="ml-2 text-gray-500 text-sm">paid so far</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium">{shareCapitalProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${shareCapitalProgress}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm text-gray-600">
                          {formatCurrency(userData.shareCapital.totalRequired - userData.shareCapital.paid)} remaining
                        </p>
                        <motion.button
                          className="text-sm text-blue-600 font-medium hover:underline"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => openDepositModal('Share Capital')}
                        >
                          Make Payment
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">Monthly Investment</h3>
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Min: {formatCurrency(1000)}/month
                      </div>
                    </div>
                    <div className="flex items-end">
                      <span className="text-2xl font-bold text-gray-800">{formatCurrency(userData.monthlyInvestment.totalInvested)}</span>
                      <span className="ml-2 text-gray-500 text-sm">total invested</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Last payment: {new Date(userData.monthlyInvestment.lastPaymentDate).toLocaleDateString()}</span>
                        <span>{formatCurrency(userData.monthlyInvestment.currentMonth)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>Next payment due: {getNextDueDate()}</span>
                      </div>
                      <motion.button
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openDepositModal('Monthly Investment')}
                      >
                        Make Monthly Deposit
                      </motion.button>
                    </div>
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
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.recentTransactions.slice(0, 5).map(transaction => (
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
                            <td className="py-3 whitespace-nowrap text-gray-500">
                              {transaction.reference}
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
                    onClick={() => openDepositModal('Monthly Investment')}
                  >
                    <div className="text-blue-600 text-xl mb-3"><FaPiggyBank /></div>
                    <h3 className="font-medium mb-2">Make a Deposit</h3>
                    <p className="text-sm text-gray-600">Add funds to your investment account</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveTab('loans')}
                  >
                    <div className="text-blue-600 text-xl mb-3"><FaExchangeAlt /></div>
                    <h3 className="font-medium mb-2">Loan Repayment</h3>
                    <p className="text-sm text-gray-600">Make a payment toward your loans</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveTab('statements')}
                  >
                    <div className="text-blue-600 text-xl mb-3"><FaDownload /></div>
                    <h3 className="font-medium mb-2">Download Statement</h3>
                    <p className="text-sm text-gray-600">Get your monthly account statement</p>
                  </motion.div>
                </div>
              </div>
            )}
            
            {/* Investments Tab */}
            {activeTab === 'investments' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Investments</h1>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-6">
                  <h2 className="text-lg font-bold mb-4">Investment Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-700 font-medium mb-2">Share Capital</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Amount Paid:</span>
                          <span className="font-medium">{formatCurrency(userData.shareCapital.paid)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Required Amount:</span>
                          <span className="font-medium">{formatCurrency(userData.shareCapital.totalRequired)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Remaining:</span>
                          <span className="font-medium">{formatCurrency(userData.shareCapital.totalRequired - userData.shareCapital.paid)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Payment Deadline:</span>
                          <span className="font-medium">{new Date(userData.shareCapital.dueDate).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Completion</span>
                            <span className="text-sm font-medium">{shareCapitalProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${shareCapitalProgress}%` }}></div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <motion.button
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openDepositModal('Share Capital')}
                          >
                            Make Share Capital Payment
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <div className="text-blue-500 mt-1 mr-2"><FaInfoCircle /></div>
                          <p className="text-sm text-blue-800">
                            Share Capital is a one-time payment of KSH 5,000 that all members must contribute within 12 months of joining the SACCO. This amount can be paid in installments.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-700 font-medium mb-2">Monthly Investment</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Total Invested:</span>
                          <span className="font-medium">{formatCurrency(userData.monthlyInvestment.totalInvested)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Monthly Requirement:</span>
                          <span className="font-medium">{formatCurrency(1000)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Last Payment:</span>
                          <span className="font-medium">{new Date(userData.monthlyInvestment.lastPaymentDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Last Payment Amount:</span>
                          <span className="font-medium">{formatCurrency(userData.monthlyInvestment.currentMonth)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Next Payment Due:</span>
                          <span className="font-medium">{getNextDueDate()}</span>
                        </div>
                        
                        <div className="mt-4">
                          <motion.button
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openDepositModal('Monthly Investment')}
                          >
                            Make Monthly Investment
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <div className="text-blue-500 mt-1 mr-2"><FaInfoCircle /></div>
                          <p className="text-sm text-blue-800">
                            Monthly Investment is a recurring deposit of at least KSH 1,000 that each member must contribute monthly. This builds your savings and increases your loan eligibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Investment Transactions</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.allTransactions
                          .filter(t => t.type === 'Monthly Investment' || t.type === 'Share Capital')
                          .map(transaction => (
                            <tr key={transaction.id}>
                              <td className="py-3 whitespace-nowrap">{transaction.type}</td>
                              <td className="py-3 whitespace-nowrap font-medium text-green-600">
                                {formatCurrency(transaction.amount)}
                              </td>
                              <td className="py-3 whitespace-nowrap text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()}
                              </td>
                              <td className="py-3 whitespace-nowrap text-gray-500">
                                {transaction.reference}
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
              </div>
            )}
            
            {/* Loans Tab */}
            {activeTab === 'loans' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Loans</h1>
                
                {/* Active Loans */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Active Loans</h2>
                  
                  {userData.loanHistory.filter(loan => loan.status === 'Active').length > 0 ? (
                    userData.loanHistory
                      .filter(loan => loan.status === 'Active')
                      .map(loan => (
                        <div key={loan.id} className="mb-6 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{loan.type}</h3>
                              <p className="text-gray-600">{formatCurrency(loan.amount)} at {loan.interestRate}% interest</p>
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {loan.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-gray-500 text-sm">Remaining Balance</p>
                              <p className="font-medium text-lg">{formatCurrency(loan.balance)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-sm">Monthly Payment</p>
                              <p className="font-medium text-lg">{formatCurrency(loan.monthlyPayment)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-sm">Next Payment Due</p>
                              <p className="font-medium text-lg">{new Date(loan.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-500">Repayment Progress</span>
                              <span className="text-sm font-medium">{Math.round((loan.payments / loan.totalPayments) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${Math.round((loan.payments / loan.totalPayments) * 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>0</span>
                              <span>{loan.payments} of {loan.totalPayments} payments made</span>
                              <span>{loan.totalPayments}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <motion.button
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Make Payment
                            </motion.button>
                            <motion.button
                              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              View Schedule
                            </motion.button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-5xl mb-4"><FaMoneyBillWave /></div>
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No Active Loans</h3>
                      <p className="text-gray-500 mb-6">You don't have any active loans at the moment.</p>
                      <motion.button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('apply')}
                      >
                        Apply for a Loan
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {/* Loan History */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Loan History</h2>
                  
                  {userData.loanHistory.filter(loan => loan.status === 'Paid').length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Type</th>
                            <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Date</th>
                            <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                            <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {userData.loanHistory
                            .filter(loan => loan.status === 'Paid')
                            .map(loan => (
                              <tr key={loan.id}>
                                <td className="py-3 whitespace-nowrap font-medium">{loan.type}</td>
                                <td className="py-3 whitespace-nowrap">{formatCurrency(loan.amount)}</td>
                                <td className="py-3 whitespace-nowrap text-gray-500">
                                  {new Date(loan.approvalDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 whitespace-nowrap text-gray-500">
                                  {loan.interestRate}%
                                </td>
                                <td className="py-3 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {loan.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 py-4">No loan history available.</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Apply for Loan Tab */}
            {activeTab === 'apply' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Apply for a Loan</h1>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-6">
                  <h2 className="text-lg font-bold mb-4">Available Loan Products</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {userData.availableLoanTypes.map((loanType, index) => (
                      <motion.div 
                        key={index}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{loanType.type}</h3>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Max Amount:</span>
                            <span className="font-medium">{formatCurrency(loanType.maxAmount)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Interest Rate:</span>
                            <span className="font-medium">{loanType.interestRate}%</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Max Term:</span>
                            <span className="font-medium">{loanType.maxTerm} months</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-sm text-gray-600">{loanType.eligibility}</p>
                        </div>
                        <motion.button
                          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Apply Now
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Loan Application Requirements</h2>
                  
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
                    <div className="flex items-start">
                      <div className="text-blue-500 mt-1 mr-2 text-lg"><FaInfoCircle /></div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-2">Before you apply</h3>
                        <p className="text-blue-700 mb-2">
                          Please ensure you meet the following requirements before applying for a loan:
                        </p>
                        <ul className="list-disc list-inside text-blue-700 space-y-1">
                          <li>You must be a registered member of KMS SACCO</li>
                          <li>Your share capital contributions must be up to date</li>
                          <li>You must have consistent monthly investments</li>
                          <li>You must have been a member for the minimum required period</li>
                          <li>You must have the capacity to repay the loan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-700 mb-3">Required Documents</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    <li>Valid National ID or Passport</li>
                    <li>Proof of income (payslips, bank statements, etc.)</li>
                    <li>Two passport-sized photographs</li>
                    <li>Guarantor information (if applicable)</li>
                    <li>Any additional documents specific to the loan type</li>
                  </ul>
                  
                  <h3 className="font-medium text-gray-700 mb-3">Application Process</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>Submit loan application with all required documents</li>
                    <li>Loan application is reviewed by the credit committee</li>
                    <li>Approval or rejection notification (within 7 working days)</li>
                    <li>If approved, loan is disbursed to your account</li>
                    <li>Begin repayment as per the agreed schedule</li>
                  </ol>
                </div>
              </div>
            )}
            
            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h1>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h2 className="text-lg font-bold mb-2 sm:mb-0">All Transactions</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Transaction Types</option>
                        <option value="Monthly Investment">Monthly Investment</option>
                        <option value="Share Capital">Share Capital</option>
                        <option value="Loan Repayment">Loan Repayment</option>
                        <option value="Loan Disbursement">Loan Disbursement</option>
                      </select>
                      
                      <input 
                        type="month" 
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Filter
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.allTransactions.map(transaction => (
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
                            <td className="py-3 whitespace-nowrap text-gray-500">
                              {transaction.reference}
                            </td>
                            <td className="py-3 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {transaction.status}
                              </span>
                            </td>
                            <td className="py-3 whitespace-nowrap">
                              <button className="text-blue-600 hover:underline text-sm">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                        Previous
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">2</button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">3</button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Statements Tab */}
            {activeTab === 'statements' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Monthly Statements</h1>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h2 className="text-lg font-bold mb-2 sm:mb-0">Available Statements</h2>
                    
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48">
                      <option value="">Select Year</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                          <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.statements.map(statement => (
                          <tr key={statement.id}>
                            <td className="py-4 font-medium">{statement.period}</td>
                            <td className="py-4 text-gray-500">
                              {new Date(statement.date).toLocaleDateString()}
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-3">
                                <motion.button
                                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm flex items-center"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaDownload className="mr-1" /> Download
                                </motion.button>
                                <motion.button
                                  className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md text-sm"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  View
                                </motion.button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="text-blue-500 mt-1 mr-2"><FaInfoCircle /></div>
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1">Monthly Statements</h3>
                        <p className="text-sm text-blue-700">
                          Monthly statements contain a summary of all your transactions, current balances, and investment growth. If you need a statement for a period not listed above, please contact our support team.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Request Statement</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">From Date</label>
                        <input 
                          type="date" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">To Date</label>
                        <input 
                          type="date" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Statement Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">All Transactions</option>
                        <option value="investments">Investments Only</option>
                        <option value="loans">Loans Only</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Delivery Method</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="delivery" className="mr-2" />
                          <span>Email</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="delivery" className="mr-2" />
                          <span>Download</span>
                        </label>
                      </div>
                    </div>
                    
                    <motion.button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Statement
                    </motion.button>
                  </form>
                </div>
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-lg font-bold mb-2 md:mb-0">Personal Information</h2>
                    <button
                    onClick={() => openUserProfile()}
                    className="text-blue-600 hover:underline flex items-center"
                    >
                    <FaUserCircle className="mr-1" /> Manage Cler Profile
                    </button>
                    
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm">Full Name</p>
                        <p className="font-medium">{fullName}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm">Email Address</p>
                        <p className="font-medium">{email}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm">Member Number</p>
                        <p className="font-medium">{userData.memberNumber}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm">Phone Number</p>
                        <p className="font-medium">{userData.phoneNumber}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm">ID Number</p>
                        <p className="font-medium">{userData.idNumber}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-sm">Member Since</p>
                        <p className="font-medium">{userData.memberSince}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <h3 className="font-bold mb-4">Update Contact Information</h3>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          value={userData.phoneNumber}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Physical Address</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="2"
                        ></textarea>
                      </div>
                      
                      <div className="md:col-span-2">
                        <motion.button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Update Information
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium mb-1">Password</h3>
                        <p className="text-sm text-gray-600">Change your account password</p>
                      </div>
                      <motion.button
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Change Password
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <motion.button
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Enable 2FA
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">Login History</h3>
                        <p className="text-sm text-gray-600">View your recent account login activities</p>
                      </div>
                      <motion.button
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View History
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Notifications Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive important updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="space-y-3 pb-4">
                      <h3 className="font-medium">Notification Preferences</h3>
                      
                      <div className="flex items-center">
                        <input id="trans-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked />
                        <label htmlFor="trans-notify" className="ml-2 text-sm text-gray-600">Transaction confirmations</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input id="payment-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked />
                        <label htmlFor="payment-notify" className="ml-2 text-sm text-gray-600">Payment reminders</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input id="news-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked />
                        <label htmlFor="news-notify" className="ml-2 text-sm text-gray-600">SACCO news and updates</label>
                      </div>
                      
                      <div className="flex items-center">
                        <input id="promo-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="promo-notify" className="ml-2 text-sm text-gray-600">Promotional offers</label>
                      </div>
                    </div>
                    
                    <motion.button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Preferences
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Make {depositType} Payment</h3>
              <button 
                onClick={() => setShowDepositModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitDeposit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-gray-700 mb-2">Amount (KES)</label>
                  <input 
                    type="number"
                    id="amount"
                    min={depositType === 'Monthly Investment' ? 1000 : 0}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={depositType === 'Monthly Investment' ? 'Minimum 1,000' : 'Enter amount'}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="payment-method" className="block text-gray-700 mb-2">Payment Method</label>
                  <select 
                    id="payment-method"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="mpesa">M-Pesa</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="cash">Cash Deposit</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="payment-date" className="block text-gray-700 mb-2">Payment Date</label>
                  <input 
                    type="date"
                    id="payment-date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea 
                    id="notes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional information"
                    rows="2"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <motion.button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium disabled:bg-blue-400"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : 'Submit Payment'}
                </motion.button>
                <motion.button
                  type="button"
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDepositModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
