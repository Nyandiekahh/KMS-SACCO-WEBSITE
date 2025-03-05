import React from 'react';
import { motion } from 'framer-motion';

const MembershipSection = () => {
  const steps = [
    {
      number: "01",
      title: "Application",
      description: "Send an email to kufanyanambayasacco@gmail.com expressing your interest in joining."
    },
    {
      number: "02",
      title: "Joining Fee",
      description: "Pay a one-time, non-refundable joining fee of Ksh 200."
    },
    {
      number: "03",
      title: "Initial Deposit",
      description: "Make a minimum initial deposit of Ksh 1,000 into your savings account."
    },
    {
      number: "04",
      title: "Approval",
      description: "The Board reviews your application and notifies you within 5 business days."
    }
  ];

  return (
    <section id="membership" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Becoming a member is simple and straightforward. Follow these steps to start your journey with KMS SACCO.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-6 h-full border-2 border-gray-100 hover:border-blue-500 transition-colors duration-300">
                <div className="text-6xl font-bold text-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
          <p className="text-lg mb-6">
            Take the first step towards financial empowerment by becoming a member of KMS SACCO today.
          </p>
          <motion.button
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full text-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply for Membership
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;