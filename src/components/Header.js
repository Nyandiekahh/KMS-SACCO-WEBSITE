import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = ({ scrollY }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' }
  ];
  
  // Dashboard navigation
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <motion.header 
      className="fixed w-full z-50 transition-all duration-300 bg-white shadow-sm py-2"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
        >
          <Link to="/" className="flex items-center">
            <img 
              src="/kms_Colored_SVG-01-01.svg" 
              alt="KMS SACCO Logo" 
              className="h-12 mr-3"
            />
            <div>
              <span className="text-2xl font-bold text-blue-600">KMS</span>
              <span className="text-xl text-gray-600 ml-1">SACCO</span>
            </div>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {pages.map((page) => (
            <motion.div key={page.name} whileHover={{ scale: 1.05 }}>
              <Link 
                to={page.path}
                className="text-base font-medium text-gray-700 hover:text-blue-600 px-2 py-1"
              >
                {page.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.button>
            
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleDashboardClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-medium shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Dashboard
                </motion.button>
                
                <div className="ml-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                      }
                    }}
                  />
                </div>
              </div>
            </SignedIn>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <SignedIn>
            <div className="mr-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white w-full shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-2">
            {pages.map((page) => (
              <Link 
                key={page.name}
                to={page.path}
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {page.name}
              </Link>
            ))}
            
            <SignedIn>
              <Link 
                to="/dashboard"
                className="block py-2 text-purple-600 font-medium hover:text-purple-800"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </SignedIn>
            
            <div className="mt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow-sm">
                Join Now
              </button>
              
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium shadow-sm">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;