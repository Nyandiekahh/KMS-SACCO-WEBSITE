import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-28 pb-20 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight">
                Your Partner in <span className="text-blue-600">Financial</span> Growth
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-600">
                KMS SACCO Limited offers comprehensive financial solutions tailored to help you achieve stability, growth, and prosperity.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base font-medium shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Become a Member
                </motion.button>
                
                {/* New Loan Application Button */}
                <Link to="/loan-application">
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-base font-medium shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Apply for Loan
                  </motion.button>
                </Link>
                
                <motion.button
                  className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-base font-medium"
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(37, 99, 235, 0.05)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-500 rounded-2xl blur-xl opacity-10 transform scale-105"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Financial Dashboard</h3>
                  <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    Personal
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Monthly Savings</span>
                      <span className="text-green-600 font-bold">+Ksh 1,000</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Target: Ksh 5,000</span>
                      <span>65% complete</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Loan Availability</span>
                      <span className="text-blue-600 font-bold">Ksh 30,000</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Maximum: Ksh 40,000</span>
                      <span>75% available</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Financial Education</span>
                      <span className="text-purple-600 font-bold">In Progress</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "40%" }}
                        transition={{ duration: 1.2, delay: 0.9 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Basic course</span>
                      <span>2 of 5 modules</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-8 bg-blue-200 rounded-full"
                animate={{ backgroundColor: i === 0 ? "#2563eb" : "#bfdbfe" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;