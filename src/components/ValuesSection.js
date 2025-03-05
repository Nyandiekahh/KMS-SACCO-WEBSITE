import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';

const ValuesSection = () => {
  const values = [
    {
      icon: <FaUsers className="text-5xl text-blue-600 mb-4" />,
      title: "Financial Inclusion",
      description: "We believe everyone deserves access to financial services regardless of background or income level."
    },
    {
      icon: <FaHandHoldingUsd className="text-5xl text-blue-600 mb-4" />,
      title: "Member Participation",
      description: "Our democratic structure ensures every member has a voice in how our Sacco operates."
    },
    {
      icon: <FaChartLine className="text-5xl text-blue-600 mb-4" />,
      title: "Social Responsibility",
      description: "We're committed to making a positive impact in our communities through ethical financial practices."
    },
  ];

  return (
    <section id="values" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At KMS SACCO, we're guided by principles that promote financial empowerment and community growth.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex flex-col items-center text-center">
                {value.icon}
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;