import React from 'react';
import { motion } from 'framer-motion';
import { FaRegLightbulb, FaShieldAlt, FaUniversity, FaGraduationCap } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUniversity />,
      title: "Competitive Savings",
      description: "Build your wealth with our competitive savings accounts that offer attractive interest rates."
    },
    {
      icon: <FaShieldAlt />,
      title: "Accessible Loans",
      description: "Access loans up to three times your savings with flexible repayment plans to meet your needs."
    },
    {
      icon: <FaGraduationCap />,
      title: "Financial Education",
      description: "Take advantage of our financial literacy programs designed to empower members."
    },
    {
      icon: <FaRegLightbulb />,
      title: "Democratic Governance",
      description: "Participate in decision-making through our democratic governance structure."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            KMS SACCO provides financial solutions designed to help you achieve your goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-4xl mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-bold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;