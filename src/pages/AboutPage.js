import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaHistory, FaChartLine } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-50 py-12 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About KMS SACCO
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Building financial futures together through inclusion, participation, and social responsibility.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4">
              KMS SACCO Limited was established with a vision to empower individuals through accessible financial services. Our journey began with a small group of dedicated individuals who believed in the power of community-based financial solutions.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we have grown into a trusted financial partner for thousands of members across Kenya, providing savings solutions, loans, and financial education to help our members achieve their goals.
            </p>
            <p className="text-gray-600">
              Today, we continue to uphold our founding principles of financial inclusion, member participation, and social responsibility, working tirelessly to build a prosperous future for our members and their communities.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-blue-50 rounded-2xl p-8 relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaHistory className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Timeline</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-2 border-blue-300 pl-4 pb-6">
                  <h4 className="text-lg font-bold text-gray-800">2015</h4>
                  <p className="text-gray-600">Founding of KMS SACCO with 20 initial members</p>
                </div>
                
                <div className="border-l-2 border-blue-300 pl-4 pb-6">
                  <h4 className="text-lg font-bold text-gray-800">2018</h4>
                  <p className="text-gray-600">Reached 500 members and expanded loan products</p>
                </div>
                
                <div className="border-l-2 border-blue-300 pl-4 pb-6">
                  <h4 className="text-lg font-bold text-gray-800">2020</h4>
                  <p className="text-gray-600">Launched digital banking platform for members</p>
                </div>
                
                <div className="border-l-2 border-blue-300 pl-4">
                  <h4 className="text-lg font-bold text-gray-800">Today</h4>
                  <p className="text-gray-600">Serving thousands of members with comprehensive financial solutions</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Mission & Vision</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaHandshake className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Our Mission</h3>
              <p className="text-gray-600 text-center">
                To provide accessible, inclusive financial services that empower our members to achieve financial stability and growth, while fostering community development through ethical practices.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaChartLine className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Our Vision</h3>
              <p className="text-gray-600 text-center">
                To be the leading member-owned financial cooperative in Kenya, recognized for excellence in service delivery, innovation, and commitment to improving the financial well-being of our members.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who guide KMS SACCO towards excellence and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Jane Doe",
              position: "Chairperson",
              bio: "With over 15 years of experience in finance, Jane leads our board with vision and integrity.",
              image: "/api/placeholder/150/150"
            },
            {
              name: "John Smith",
              position: "CEO",
              bio: "John brings strategic insight and operational excellence to drive KMS SACCO's growth.",
              image: "/api/placeholder/150/150"
            },
            {
              name: "Sarah Johnson",
              position: "Finance Director",
              bio: "Sarah ensures financial stability and transparency in all our operations.",
              image: "/api/placeholder/150/150"
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100" 
              />
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-4">{member.position}</p>
              <p className="text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;