import React, { useState, useEffect, useMemo } from 'react';
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
  FaInfoCircle,
  FaUsers,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaUserShield
} from 'react-icons/fa';

// SACCO Data - Consider moving to a separate data module for better organization
const membersData = {
  "einsteinmokua100@gmail.com": {
    name: "Einstein Mokua",
    memberNumber: "KMS2022-001",
    phoneNumber: "+254712345601",
    idNumber: "12345601",
    memberSince: "January 2022",
    isAdmin: true,
    balance: {
      shareCapital: {
        paid: 2000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 0,
        lastPaymentDate: null,
        currentMonth: 0,
      },
      total: 2000
    },
    hasDebt: false,
    debtAmount: 0
  },
  "polycarpkesar@gmail.com": {
    name: "Polycarp Kesa",
    memberNumber: "KMS2022-002",
    phoneNumber: "+254712345602",
    idNumber: "12345602",
    memberSince: "January 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 0,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 0,
        lastPaymentDate: null,
        currentMonth: 0,
      },
      total: -6500
    },
    hasDebt: true,
    debtAmount: 16000,
    debtNotes: "Your account currently has an outstanding debt of KSh 16,000.00. All associated late payment fines have been pardoned. As of now, your net balance is -KSh 6,500.00, which means you effectively have no valid investments in the Sacco. You need to pay the full debt of KSh 16,000.00 to restore your investment balance to KSh 9,500.00 and return your account to good standing."
  },
  "bradleyndege08@gmail.com": {
    name: "Bradley",
    memberNumber: "KMS2022-003",
    phoneNumber: "+254712345603",
    idNumber: "12345603",
    memberSince: "February 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 5000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 500,
        lastPaymentDate: '2025-02-15',
        currentMonth: 500,
      },
      total: 5500
    },
    hasDebt: false,
    debtAmount: 0
  },
  "davidgitonga083@gmail.com": {
    name: "David Gitonga",
    memberNumber: "KMS2022-004",
    phoneNumber: "+254712345604",
    idNumber: "12345604",
    memberSince: "February 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 5000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 5500,
        lastPaymentDate: '2025-02-15',
        currentMonth: 1000,
      },
      total: 10500
    },
    hasDebt: false,
    debtAmount: 0
  },
  "nellyjepkemboi03.com": {
    name: "Nelly Jepkemboi",
    memberNumber: "KMS2022-005",
    phoneNumber: "+254712345605",
    idNumber: "12345605",
    memberSince: "February 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 5000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 13000,
        lastPaymentDate: '2025-02-15',
        currentMonth: 1000,
      },
      total: 18000
    },
    hasDebt: false,
    debtAmount: 0
  },
  "kipkoriroscar432@gmail.com": {
    name: "Oscar Kipkorir",
    memberNumber: "KMS2022-006",
    phoneNumber: "+254712345606",
    idNumber: "12345606",
    memberSince: "March 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 5000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 6500,
        lastPaymentDate: '2025-02-15',
        currentMonth: 1000,
      },
      total: 11500
    },
    hasDebt: false,
    debtAmount: 0
  },
  "jamesmelita061@gmail.com": {
    name: "James Melita",
    memberNumber: "KMS2022-007",
    phoneNumber: "+254712345607",
    idNumber: "12345607",
    memberSince: "March 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 1000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 500,
        lastPaymentDate: '2025-01-15',
        currentMonth: 500,
      },
      total: 1500
    },
    hasDebt: false,
    debtAmount: 0
  },
  "isaacgitonga691@gmail.com": {
    name: "Isaac Gitonga",
    memberNumber: "KMS2022-008",
    phoneNumber: "+254712345608",
    idNumber: "12345608",
    memberSince: "March 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 5000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 500,
        lastPaymentDate: '2025-01-15',
        currentMonth: 500,
      },
      total: 5500
    },
    hasDebt: false,
    debtAmount: 0
  },
  "muragekamori24@gmail.com": {
    name: "Sonia Murage",
    memberNumber: "KMS2022-009",
    phoneNumber: "+254712345609",
    idNumber: "12345609",
    memberSince: "March 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 0,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 0,
        lastPaymentDate: null,
        currentMonth: 0,
      },
      total: -21100
    },
    hasDebt: true,
    debtAmount: 21100,
    debtNotes: "You have a debt of KSh 21,100.00. Please make arrangements to settle this debt as soon as possible."
  },
  "aikavaleriesm@gmail.com": {
    name: "Valerie Aika",
    memberNumber: "KMS2022-010",
    phoneNumber: "+254712345610",
    idNumber: "12345610",
    memberSince: "April 2022",
    isAdmin: false,
    balance: {
      shareCapital: {
        paid: 2000,
        totalRequired: 5000,
        dueDate: '2023-05-15',
      },
      monthlyInvestment: {
        totalInvested: 2000,
        lastPaymentDate: '2025-01-15',
        currentMonth: 1000,
      },
      total: 4000
    },
    hasDebt: false,
    debtAmount: 0
  }
};

const loansData = [
  { 
    id: 1, 
    borrower: "Anonymous Member", 
    amount: 20000, 
    interestRate: 12,
    startDate: '2024-06-15',
    dueDate: '2024-09-15',
    status: 'Defaulted',
    guarantors: ["Einstein Mokua", "Sonia Murage"],
    notes: "This loan has been defaulted. Guarantors' investments were used to cover the loan amount."
  },
  { 
    id: 2, 
    borrower: "Active Member", 
    amount: 10000, 
    interestRate: 10,
    startDate: '2025-01-12',
    dueDate: '2025-03-12',
    status: 'Active',
    guarantors: ["David Gitonga", "Nelly Jepkemboi"],
    notes: "Loan repayment is on schedule."
  },
  { 
    id: 3, 
    borrower: "Active Member", 
    amount: 20000, 
    interestRate: 3,
    startDate: '2025-01-17',
    dueDate: '2025-04-17',
    status: 'Active',
    guarantors: ["Oscar Kipkorir", "Bradley"],
    notes: "Loan repayment is on schedule."
  }
];

const saccoStats = {
  totalMembers: 10,
  activeMembers: 8,
  totalShares: 30000,
  totalDeposits: 28000,
  totalLoans: 50000,
  activeLoans: 30000,
  defaultedLoans: 20000,
  totalAssets: 58000,
  monthlyGrowthRate: 5.2,
  yearToDateGrowthRate: 15.7,
  establishedDate: "January 2022",
};

// Component-level utility functions
const generateTransactions = (memberEmail) => {
  const userData = membersData[memberEmail];
  if (!userData) return [];
  
  const transactions = [];
  
  // Share capital transactions
  if (userData.balance.shareCapital.paid > 0) {
    const installments = Math.ceil(userData.balance.shareCapital.paid / 1000);
    for (let i = 0; i < installments; i++) {
      const amount = i === installments - 1 && userData.balance.shareCapital.paid % 1000 !== 0 
        ? userData.balance.shareCapital.paid % 1000 
        : 1000;
        
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      transactions.push({
        id: `sc-${i}-${memberEmail}`,
        type: 'Share Capital',
        amount: amount,
        date: date.toISOString().split('T')[0],
        status: 'Completed',
        reference: `SHR-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`
      });
    }
  }
  
  // Monthly investment transactions
  if (userData.balance.monthlyInvestment.totalInvested > 0) {
    const installments = Math.ceil(userData.balance.monthlyInvestment.totalInvested / 500);
    for (let i = 0; i < installments; i++) {
      const amount = i === installments - 1 && userData.balance.monthlyInvestment.totalInvested % 500 !== 0 
        ? userData.balance.monthlyInvestment.totalInvested % 500 
        : 500;
        
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      transactions.push({
        id: `mi-${i}-${memberEmail}`,
        type: 'Monthly Investment',
        amount: amount,
        date: date.toISOString().split('T')[0],
        status: 'Completed',
        reference: `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`
      });
    }
  }
  
  // Debt related transactions
  if (userData.hasDebt && userData.debtAmount > 0) {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    
    transactions.push({
      id: `debt-${memberEmail}`,
      type: 'Debt Notification',
      amount: -userData.debtAmount,
      date: date.toISOString().split('T')[0],
      status: 'Pending',
      reference: `DEBT-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const generateStatements = (memberEmail) => {
  const userData = membersData[memberEmail];
  if (!userData) return [];
  
  const statements = [];
  const currentDate = new Date();
  
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    statements.push({
      id: i + 1,
      period: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
      date: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0],
      downloadUrl: '#'
    });
  }
  
  return statements;
};

// Reusable UI Components
const StatusBadge = ({ status, customClasses = '' }) => {
  let colorClasses;
  
  switch(status) {
    case 'Completed':
    case 'Active':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'Pending':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Defaulted':
      colorClasses = 'bg-red-100 text-red-800';
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses} ${customClasses}`}>
      {status}
    </span>
  );
};

const ProgressBar = ({ value, max, colorClass = 'bg-blue-600' }) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        className={`bg-white rounded-2xl p-6 w-full ${maxWidth}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

const SectionCard = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm p-6 border border-gray-100 ${className}`}>
    {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
    {children}
  </div>
);

const SaccoAlertBox = ({ type, title, message, icon: Icon }) => {
  const colorClasses = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    success: 'bg-green-50 border-green-100 text-green-800',
    warning: 'bg-yellow-50 border-yellow-100 text-yellow-800',
    error: 'bg-red-50 border-red-100 text-red-800',
  };
  
  const iconColors = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };
  
  return (
    <div className={`p-4 rounded-lg border ${colorClasses[type]}`}>
      <div className="flex items-start">
        <div className={`mt-1 mr-2 ${iconColors[type]}`}><Icon /></div>
        <div>
          {title && <h4 className="font-medium mb-2">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositType, setDepositType] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  // Extract user information
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || 'anonymous@example.com';
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Member';
  
  // Get current member data
  const member = useMemo(() => {
    return membersData[email] || {
      name: fullName,
      memberNumber: 'KMS-GUEST',
      phoneNumber: '',
      idNumber: '',
      memberSince: 'Not a member',
      isAdmin: false,
      balance: {
        shareCapital: {
          paid: 0,
          totalRequired: 5000,
          dueDate: '',
        },
        monthlyInvestment: {
          totalInvested: 0,
          lastPaymentDate: null,
          currentMonth: 0,
        },
        total: 0
      },
      hasDebt: false,
      debtAmount: 0
    };
  }, [email, fullName]);

  // Calculate share capital progress percentage
  const shareCapitalProgress = useMemo(() => {
    return Math.min(100, Math.round((member.balance.shareCapital.paid / member.balance.shareCapital.totalRequired) * 100));
  }, [member.balance.shareCapital.paid, member.balance.shareCapital.totalRequired]);
  
  // Generate user transactions and statements using memoization for performance
  const userTransactions = useMemo(() => generateTransactions(email), [email]);
  const userStatements = useMemo(() => generateStatements(email), [email]);

  // Filtered members for admin view
  const filteredMembers = useMemo(() => {
    return Object.entries(membersData)
      .filter(([_, memberData]) => {
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            memberData.name.toLowerCase().includes(searchLower) || 
            memberData.memberNumber.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
      .filter(([_, memberData]) => {
        if (filterStatus === 'active') return memberData.balance.total >= 5000 && !memberData.hasDebt;
        if (filterStatus === 'inactive') return memberData.balance.total < 5000 && !memberData.hasDebt;
        if (filterStatus === 'debt') return memberData.hasDebt;
        return true;
      });
  }, [searchTerm, filterStatus]);

  // Generate next monthly investment due date
  const getNextDueDate = () => {
    if (!member.balance.monthlyInvestment.lastPaymentDate) {
      return 'No previous payments';
    }
    
    const lastPaymentDate = new Date(member.balance.monthlyInvestment.lastPaymentDate);
    const nextDueDate = new Date(lastPaymentDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);
    return nextDueDate.toLocaleDateString();
  };

  // Sidebar navigation items
  const sidebarItems = useMemo(() => {
    const items = [
      { id: 'overview', label: 'Overview', icon: <FaHome /> },
      { id: 'investments', label: 'Investments', icon: <FaPiggyBank /> },
      { id: 'loans', label: 'Loans', icon: <FaMoneyBillWave /> },
      { id: 'transactions', label: 'Transactions', icon: <FaHistory /> },
      { id: 'statements', label: 'Statements', icon: <FaFileInvoice /> },
      { id: 'statistics', label: 'SACCO Stats', icon: <FaChartLine /> },
      { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
    ];
    
    // Add admin section if user is admin
    if (member.isAdmin) {
      items.splice(6, 0, { id: 'members', label: 'Members', icon: <FaUsers /> });
    }
    
    return items;
  }, [member.isAdmin]);

  // Event Handlers
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const openDepositModal = (type) => {
    setDepositType(type);
    setDepositAmount('');
    setShowDepositModal(true);
  };

  const handleSubmitDeposit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDepositModal(false);
      
      // Show success message
      alert(`${depositType} deposit of ${formatCurrency(depositAmount)} submitted successfully.`);
    }, 1500);
  };
  
  const openMemberDetails = (memberEmail) => {
    setSelectedMember(membersData[memberEmail]);
    setShowMemberDetailsModal(true);
  };

  // Tab Components
  const OverviewTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Welcome Back, {member.name.split(' ')[0] || 'Member'}</h1>
      
      {/* Debt Alert for members with debt */}
      {member.hasDebt && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Important: Outstanding Debt</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{member.debtNotes || `You have an outstanding debt of ${formatCurrency(member.debtAmount)}. Please make arrangements to clear this debt.`}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Current Balance</h3>
          <div className="flex items-end">
            <span className={`text-3xl font-bold ${member.balance.total < 0 ? 'text-red-600' : 'text-gray-800'}`}>
              {formatCurrency(member.balance.total)}
            </span>
            {member.balance.total >= 0 && (
              <span className="ml-2 text-green-500 text-sm">Active Member</span>
            )}
            {member.balance.total < 0 && (
              <span className="ml-2 text-red-500 text-sm">Debt Situation</span>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Share Capital</span>
              <span className="text-sm font-medium">{formatCurrency(member.balance.shareCapital.paid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Monthly Investments</span>
              <span className="text-sm font-medium">{formatCurrency(member.balance.monthlyInvestment.totalInvested)}</span>
            </div>
            {member.hasDebt && (
              <div className="flex justify-between">
                <span className="text-sm text-red-500">Outstanding Debt</span>
                <span className="text-sm font-medium text-red-500">-{formatCurrency(member.debtAmount)}</span>
              </div>
            )}
          </div>
        </SectionCard>
        
        <SectionCard>
          <h3 className="text-gray-600 text-sm font-medium mb-2">SACCO Snapshot</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Members</span>
                <span className="font-medium">{saccoStats.totalMembers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Loans</span>
                <span className="font-medium">{formatCurrency(saccoStats.activeLoans)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Assets</span>
                <span className="font-medium">{formatCurrency(saccoStats.totalAssets)}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">Monthly Growth</span>
              <div className="flex items-center">
                <FaArrowUp className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{saccoStats.monthlyGrowthRate}%</span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
      
      {/* Investment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Share Capital</h3>
            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              Required: {formatCurrency(member.balance.shareCapital.totalRequired)}
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800">{formatCurrency(member.balance.shareCapital.paid)}</span>
            <span className="ml-2 text-gray-500 text-sm">paid so far</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium">{shareCapitalProgress}%</span>
            </div>
            <ProgressBar 
              value={member.balance.shareCapital.paid} 
              max={member.balance.shareCapital.totalRequired} 
              colorClass={shareCapitalProgress === 100 ? 'bg-green-600' : 'bg-blue-600'}
            />
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600">
                {formatCurrency(member.balance.shareCapital.totalRequired - member.balance.shareCapital.paid)} remaining
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
        </SectionCard>
        
        <SectionCard>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Monthly Investment</h3>
            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Min: {formatCurrency(1000)}/month
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800">{formatCurrency(member.balance.monthlyInvestment.totalInvested)}</span>
            <span className="ml-2 text-gray-500 text-sm">total invested</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Last payment: {member.balance.monthlyInvestment.lastPaymentDate ? new Date(member.balance.monthlyInvestment.lastPaymentDate).toLocaleDateString() : 'No payments yet'}</span>
              <span>{member.balance.monthlyInvestment.lastPaymentDate ? formatCurrency(member.balance.monthlyInvestment.currentMonth) : '-'}</span>
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
        </SectionCard>
      </div>
      
      {/* Recent Transactions */}
      <SectionCard>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-800">Recent Transactions</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline" onClick={() => setActiveTab('transactions')}>
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          {userTransactions.length > 0 ? (
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
                {userTransactions.slice(0, 5).map(transaction => (
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
                      <StatusBadge status={transaction.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No transactions to display
            </div>
          )}
        </div>
      </SectionCard>
      
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
          <h3 className="font-medium mb-2">Loan Information</h3>
          <p className="text-sm text-gray-600">View current SACCO loans</p>
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
  );

  const InvestmentsTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Investments</h1>
      
      <SectionCard className="mb-6">
        <h2 className="text-lg font-bold mb-4">Investment Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Share Capital</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium">{formatCurrency(member.balance.shareCapital.paid)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Required Amount:</span>
                <span className="font-medium">{formatCurrency(member.balance.shareCapital.totalRequired)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Remaining:</span>
                <span className="font-medium">{formatCurrency(member.balance.shareCapital.totalRequired - member.balance.shareCapital.paid)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Payment Deadline:</span>
                <span className="font-medium">{member.balance.shareCapital.dueDate ? new Date(member.balance.shareCapital.dueDate).toLocaleDateString() : 'No deadline set'}</span>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Completion</span>
                  <span className="text-sm font-medium">{shareCapitalProgress}%</span>
                </div>
                <ProgressBar 
                  value={member.balance.shareCapital.paid} 
                  max={member.balance.shareCapital.totalRequired} 
                  colorClass="bg-green-600"
                />
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
            
            <SaccoAlertBox
              type="info"
              message="Share Capital is a one-time payment of KSh 5,000 that all members must contribute. This amount can be paid in installments."
              icon={FaInfoCircle}
              className="mt-4"
            />
          </div>
          
          <div>
            <h3 className="text-gray-700 font-medium mb-2">Monthly Investment</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Invested:</span>
                <span className="font-medium">{formatCurrency(member.balance.monthlyInvestment.totalInvested)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Monthly Requirement:</span>
                <span className="font-medium">{formatCurrency(1000)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Last Payment:</span>
                <span className="font-medium">{member.balance.monthlyInvestment.lastPaymentDate ? new Date(member.balance.monthlyInvestment.lastPaymentDate).toLocaleDateString() : 'No payments yet'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Last Payment Amount:</span>
                <span className="font-medium">{member.balance.monthlyInvestment.lastPaymentDate ? formatCurrency(member.balance.monthlyInvestment.currentMonth) : '-'}</span>
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
            
            <SaccoAlertBox
              type="info"
              message="Monthly Investment is a recurring deposit of at least KSh 1,000 that each member should contribute monthly. This builds your savings and increases your loan eligibility."
              icon={FaInfoCircle}
              className="mt-4"
            />
          </div>
        </div>
      </SectionCard>
      
      <SectionCard>
        <h2 className="text-lg font-bold mb-4">Investment Transactions</h2>
        
        <div className="overflow-x-auto">
          {userTransactions.filter(t => t.type === 'Monthly Investment' || t.type === 'Share Capital').length > 0 ? (
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
                {userTransactions
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
                        <StatusBadge status={transaction.status} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No investment transactions to display
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );

  const LoansTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">SACCO Loans</h1>
      
      <SectionCard className="mb-6">
        <h2 className="text-lg font-bold mb-4">Loan Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-blue-700 text-lg font-medium mb-2">Total Active Loans</div>
            <div className="text-2xl font-bold text-gray-800">{formatCurrency(saccoStats.activeLoans)}</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="text-red-700 text-lg font-medium mb-2">Defaulted Loans</div>
            <div className="text-2xl font-bold text-gray-800">{formatCurrency(saccoStats.defaultedLoans)}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-green-700 text-lg font-medium mb-2">Loan Approval Rate</div>
            <div className="text-2xl font-bold text-gray-800">85%</div>
          </div>
        </div>
        
        {/* Loan Eligibility Check */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Your Loan Eligibility</h3>
          
          {member.hasDebt ? (
            <div className="flex items-start">
              <div className="text-red-500 mt-1 mr-2"><FaExclamationTriangle /></div>
              <div>
                <p className="text-red-700 mb-2">You are not eligible for a loan at this time.</p>
                <p className="text-sm text-gray-600">You have an outstanding debt that needs to be cleared before you can apply for a loan.</p>
              </div>
            </div>
          ) : member.balance.total < 5000 ? (
            <div className="flex items-start">
              <div className="text-yellow-500 mt-1 mr-2"><FaExclamationTriangle /></div>
              <div>
                <p className="text-yellow-700 mb-2">Limited loan eligibility.</p>
                <p className="text-sm text-gray-600">Your current balance is below the recommended minimum of KSh 5,000 for loan applications. Consider increasing your investments to improve loan eligibility.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start">
              <div className="text-green-500 mt-1 mr-2"><FaInfoCircle /></div>
              <div>
                <p className="text-green-700 mb-2">You are eligible to apply for a loan.</p>
                <p className="text-sm text-gray-600">Based on your current balance of {formatCurrency(member.balance.total)}, you can apply for a loan of up to {formatCurrency(member.balance.total * 2)}.
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                    Apply for a Loan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>
      
      {/* Active Loans Table */}
      <SectionCard>
        <h2 className="text-lg font-bold mb-4">Current SACCO Loans</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loansData.map(loan => (
                <tr key={loan.id}>
                  <td className="py-3 whitespace-nowrap font-medium">{formatCurrency(loan.amount)}</td>
                  <td className="py-3 whitespace-nowrap">{loan.interestRate}%</td>
                  <td className="py-3 whitespace-nowrap text-gray-500">
                    {new Date(loan.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 whitespace-nowrap text-gray-500">
                    {new Date(loan.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <StatusBadge status={loan.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      
      {/* Loan Notes */}
      <SectionCard>
        <h2 className="text-lg font-bold mb-4">Loan Notes</h2>
        
        <div className="space-y-4">
          {loansData.map(loan => (
            <div key={`note-${loan.id}`} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Loan #{loan.id}: {formatCurrency(loan.amount)}</span>
                <StatusBadge status={loan.status} />
              </div>
              <p className="text-sm text-gray-600">{loan.notes}</p>
              {loan.guarantors && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Guarantors: {loan.guarantors.join(', ')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

  const TransactionsTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h1>
      
      <SectionCard>
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
          {userTransactions.length > 0 ? (
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
                {userTransactions.map(transaction => (
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
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      {transaction.status === 'Completed' && (
                        <button className="text-blue-600 hover:underline text-sm">
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No transactions to display
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );

  const StatementsTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Monthly Statements</h1>
      
      <SectionCard>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-lg font-bold mb-2 sm:mb-0">Available Statements</h2>
          
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48">
            <option value="">Select Year</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          {userStatements.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                  <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userStatements.map(statement => (
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
          ) : (
            <div className="text-center py-8 text-gray-500">
              No statements available
            </div>
          )}
        </div>
      </SectionCard>
      
      <SectionCard>
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
      </SectionCard>
    </div>
  );

  const StatisticsTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">SACCO Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm font-medium mb-2">Total Members</div>
          <div className="text-3xl font-bold text-gray-800">{saccoStats.totalMembers}</div>
          <div className="mt-2 text-sm text-green-600">
            <FaArrowUp className="inline mr-1" />
            <span>10% growth from last quarter</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm font-medium mb-2">Total Assets</div>
          <div className="text-3xl font-bold text-gray-800">{formatCurrency(saccoStats.totalAssets)}</div>
          <div className="mt-2 text-sm text-green-600">
            <FaArrowUp className="inline mr-1" />
            <span>{saccoStats.yearToDateGrowthRate}% growth this year</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm font-medium mb-2">Active Loans</div>
          <div className="text-3xl font-bold text-gray-800">{formatCurrency(saccoStats.activeLoans)}</div>
          <div className="mt-2 text-sm text-green-600">
            <FaArrowUp className="inline mr-1" />
            <span>3 active loans</span>
          </div>
        </div>
      </div>
      
      <SectionCard className="mb-6">
        <h2 className="text-lg font-bold mb-4">Financial Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-700 font-medium mb-3">Assets Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Total Shares</span>
                  <span className="text-sm font-medium">{formatCurrency(saccoStats.totalShares)}</span>
                </div>
                <ProgressBar 
                  value={saccoStats.totalShares} 
                  max={saccoStats.totalAssets} 
                  colorClass="bg-blue-600"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Total Deposits</span>
                  <span className="text-sm font-medium">{formatCurrency(saccoStats.totalDeposits)}</span>
                </div>
                <ProgressBar 
                  value={saccoStats.totalDeposits} 
                  max={saccoStats.totalAssets} 
                  colorClass="bg-green-600"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Outstanding Loans</span>
                  <span className="text-sm font-medium">{formatCurrency(saccoStats.totalLoans)}</span>
                </div>
                <ProgressBar 
                  value={saccoStats.totalLoans} 
                  max={saccoStats.totalAssets} 
                  colorClass="bg-purple-600"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-medium mb-3">Loan Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Active Loans</span>
                  <span className="text-sm font-medium">{formatCurrency(saccoStats.activeLoans)}</span>
                </div>
                <ProgressBar 
                  value={saccoStats.activeLoans} 
                  max={saccoStats.totalLoans} 
                  colorClass="bg-green-600"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Defaulted Loans</span>
                  <span className="text-sm font-medium">{formatCurrency(saccoStats.defaultedLoans)}</span>
                </div>
                <ProgressBar 
                  value={saccoStats.defaultedLoans} 
                  max={saccoStats.totalLoans} 
                  colorClass="bg-red-600"
                />
              </div>
              
              <SaccoAlertBox
                type="info"
                message={`The SACCO currently has a loan recovery rate of ${formatCurrency(saccoStats.activeLoans)} / ${formatCurrency(saccoStats.totalLoans)} = ${Math.round((saccoStats.activeLoans / saccoStats.totalLoans) * 100)}%. We aim to maintain a recovery rate above 95%.`}
                icon={FaInfoCircle}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </SectionCard>
      
      <SectionCard>
        <h2 className="text-lg font-bold mb-4">Member Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-700 font-medium mb-3">Member Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span>Active Members</span>
                </span>
                <span className="font-medium">{saccoStats.activeMembers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span>Inactive Members</span>
                </span>
                <span className="font-medium">{saccoStats.totalMembers - saccoStats.activeMembers}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(saccoStats.activeMembers / saccoStats.totalMembers) * 100}%`}}></div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-medium mb-3">Share Capital Completion</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span>Completed (KSh 5,000)</span>
                </span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  <span>Partial Payment</span>
                </span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span>No Payment</span>
                </span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      
      <SectionCard>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-lg font-bold mb-2 md:mb-0">Personal Information</h2>
          <button 
            onClick={() => openUserProfile()}
            className="text-blue-600 hover:underline flex items-center"
          >
            <FaUserCircle className="mr-1" /> Manage Clerk Profile
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-medium">{member.name}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Email Address</p>
              <p className="font-medium">{email}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Member Number</p>
              <p className="font-medium">{member.memberNumber}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-medium">{member.phoneNumber}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-500 text-sm">ID Number</p>
              <p className="font-medium">{member.idNumber}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Member Since</p>
              <p className="font-medium">{member.memberSince}</p>
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
                defaultValue={member.phoneNumber}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue={email}
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
      </SectionCard>
      
      <SectionCard>
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
      </SectionCard>
      
      <SectionCard>
        <h2 className="text-lg font-bold mb-4">Notifications Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive important updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className="text-sm text-gray-600">Receive important updates via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="space-y-3 pb-4">
            <h3 className="font-medium">Notification Preferences</h3>
            
            <div className="flex items-center">
              <input id="trans-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
              <label htmlFor="trans-notify" className="ml-2 text-sm text-gray-600">Transaction confirmations</label>
            </div>
            
            <div className="flex items-center">
              <input id="payment-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
              <label htmlFor="payment-notify" className="ml-2 text-sm text-gray-600">Payment reminders</label>
            </div>
            
            <div className="flex items-center">
              <input id="news-notify" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
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
      </SectionCard>
    </div>
  );

  const MembersTab = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Member Management</h1>
      
      <SectionCard className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-lg font-bold mb-2 sm:mb-0">All Members</h2>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="debt">With Debt</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member #</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share Capital</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map(([email, memberData]) => (
                <tr key={email} className="hover:bg-gray-50">
                  <td className="py-3 whitespace-nowrap font-medium">{memberData.name}</td>
                  <td className="py-3 whitespace-nowrap">{memberData.memberNumber}</td>
                  <td className={`py-3 whitespace-nowrap ${memberData.balance.total < 0 ? 'text-red-600 font-medium' : ''}`}>
                    {formatCurrency(memberData.balance.total)}
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    {formatCurrency(memberData.balance.shareCapital.paid)} / {formatCurrency(memberData.balance.shareCapital.totalRequired)}
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      memberData.hasDebt ? 'bg-red-100 text-red-800' : 
                      memberData.balance.total >= 5000 ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {memberData.hasDebt ? 'Debt' : 
                       memberData.balance.total >= 5000 ? 'Active' : 
                       'Limited'}
                    </span>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <button 
                      onClick={() => openMemberDetails(email)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard>
          <h2 className="text-lg font-bold mb-4">Member Status Overview</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Active Members</span>
                <span className="text-sm font-medium">{saccoStats.activeMembers} / {saccoStats.totalMembers}</span>
              </div>
              <ProgressBar 
                value={saccoStats.activeMembers} 
                max={saccoStats.totalMembers} 
                colorClass="bg-green-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Members with Debt</span>
                <span className="text-sm font-medium">2 / {saccoStats.totalMembers}</span>
              </div>
              <ProgressBar 
                value={2} 
                max={saccoStats.totalMembers} 
                colorClass="bg-red-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Completed Share Capital</span>
                <span className="text-sm font-medium">5 / {saccoStats.totalMembers}</span>
              </div>
              <ProgressBar 
                value={5} 
                max={saccoStats.totalMembers} 
                colorClass="bg-blue-600"
              />
            </div>
          </div>
        </SectionCard>
        
        <SectionCard>
          <h2 className="text-lg font-bold mb-4">Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Add New Member
            </button>
            
            <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
              Send Communication to All Members
            </button>
            
            <button className="w-full px-4 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50">
              Export Member Data
            </button>
            
            <button className="w-full px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50">
              Generate Reports
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );

  // Deposit Modal Component
  const DepositModalContent = () => (
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
  );

  // Member Details Modal Component (Admin Only)
  const MemberDetailsModalContent = () => {
    if (!selectedMember) return null;
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium text-lg mb-4">Personal Information</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{selectedMember.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Member Number:</span>
                <span className="font-medium">{selectedMember.memberNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-medium">{selectedMember.phoneNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">ID Number:</span>
                <span className="font-medium">{selectedMember.idNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-medium">{selectedMember.memberSince}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Financial Overview</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Total Balance:</span>
                <span className={`font-medium ${selectedMember.balance.total < 0 ? 'text-red-600' : ''}`}>
                  {formatCurrency(selectedMember.balance.total)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Share Capital:</span>
                <span className="font-medium">
                  {formatCurrency(selectedMember.balance.shareCapital.paid)} / {formatCurrency(selectedMember.balance.shareCapital.totalRequired)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Monthly Investment:</span>
                <span className="font-medium">{formatCurrency(selectedMember.balance.monthlyInvestment.totalInvested)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Last Payment:</span>
                <span className="font-medium">
                  {selectedMember.balance.monthlyInvestment.lastPaymentDate ? 
                    new Date(selectedMember.balance.monthlyInvestment.lastPaymentDate).toLocaleDateString() : 
                    'No payments yet'}
                </span>
              </div>
              {selectedMember.hasDebt && (
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-red-600">Outstanding Debt:</span>
                  <span className="font-medium text-red-600">{formatCurrency(selectedMember.debtAmount)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {selectedMember.hasDebt && (
          <SaccoAlertBox
            type="error"
            title="Debt Situation"
            message={selectedMember.debtNotes || `This member has an outstanding debt of ${formatCurrency(selectedMember.debtAmount)}.`}
            icon={FaExclamationTriangle}
            className="mb-6"
          />
        )}
        
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <motion.button
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Edit Member
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Record Payment
          </motion.button>
          <motion.button
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Reminder
          </motion.button>
        </div>
      </>
    );
  };

  // Render the main component
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
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl" />
                  )}
                </div>
                <h3 className="mt-3 font-bold text-lg">{member.name}</h3>
                <p className="text-blue-100 text-sm">{member.memberNumber}</p>
                {member.isAdmin && (
                  <div className="mt-2 bg-white/20 px-2 py-1 rounded-full inline-flex items-center">
                    <FaUserShield className="mr-1 text-xs" />
                    <span className="text-xs">Admin</span>
                  </div>
                )}
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
            {/* Render the appropriate tab content */}
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'investments' && <InvestmentsTab />}
            {activeTab === 'loans' && <LoansTab />}
            {activeTab === 'transactions' && <TransactionsTab />}
            {activeTab === 'statements' && <StatementsTab />}
            {activeTab === 'statistics' && <StatisticsTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'members' && member.isAdmin && <MembersTab />}
          </motion.div>
        </div>
      </div>
      
      {/* Modals */}
      <Modal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)}
        title={`Make ${depositType} Payment`}
      >
        <DepositModalContent />
      </Modal>
      
      <Modal 
        isOpen={showMemberDetailsModal} 
        onClose={() => setShowMemberDetailsModal(false)}
        title={`Member Details: ${selectedMember?.name || ''}`}
        maxWidth="max-w-3xl"
      >
        <MemberDetailsModalContent />
      </Modal>
    </div>
  );
};

export default DashboardPage;
