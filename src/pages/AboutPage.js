import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaHistory, FaChartLine, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

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
              KMS SACCO Limited was established in 2022 with a vision to empower individuals through accessible financial services. Our journey began with just 2 dedicated members who believed in the power of community-based financial solutions.
            </p>
            <p className="text-gray-600 mb-4">
              Initially, we operated as a merry-go-round, investing together and giving proceeds to one member while saving 40% of the investment. After seeing the power of collective saving, we increased our investment amounts and transitioned to a full-time savings model.
            </p>
            <p className="text-gray-600">
              As interest grew, we formalized our membership process with clear terms and conditions. Today, we have grown to over 10 members and continue to uphold our founding principles of financial inclusion, member participation, and social responsibility.
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
                  <h4 className="text-lg font-bold text-gray-800">2022</h4>
                  <p className="text-gray-600">Founding of KMS SACCO with 2 initial members</p>
                </div>
                
                <div className="border-l-2 border-blue-300 pl-4 pb-6">
                  <h4 className="text-lg font-bold text-gray-800">Early 2022</h4>
                  <p className="text-gray-600">Expanded to 3 members - "the boys" - operating as a merry-go-round</p>
                </div>
                
                <div className="border-l-2 border-blue-300 pl-4 pb-6">
                  <h4 className="text-lg font-bold text-gray-800">Late 2022</h4>
                  <p className="text-gray-600">Transitioned from merry-go-round to full-time savings model</p>
                </div>
                
                <div className="border-l-2 border-blue-300 pl-4">
                  <h4 className="text-lg font-bold text-gray-800">Today</h4>
                  <p className="text-gray-600">Formalized membership process with 10+ members and growing</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">A Message from Our Founder</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <motion.div
                className="md:col-span-1 flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img 
                    src="/api/placeholder/300/300" 
                    alt="Founder" 
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl" 
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                    Founder
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                  <FaQuoteLeft className="text-blue-100 text-4xl absolute top-4 left-4" />
                  
                  <div className="relative z-10">
                    <p className="text-gray-600 mb-4">
                      When I established KMS SACCO in 2022, I was driven by a simple but powerful vision: to create a financial institution that truly serves its community. Starting with just two members, we believed in the power of collective saving and investment.
                    </p>
                    <p className="text-gray-600 mb-4">
                      What began as a modest merry-go-round among friends has evolved into a structured savings cooperative. We initially invested together, distributing funds to one member while saving 40% of our contributions. As we saw the benefits of this approach, we increased our investment amounts and shifted to a full-time savings model.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Our growth to over 10 members has been organic and purposeful. We've established clear terms and conditions for membership to ensure the stability and integrity of our cooperative. 
                    </p>
                    <p className="text-gray-600">
                      I remain committed to our founding principles as we continue to grow. At KMS SACCO, you are more than just a member—you are part of our financial family, and together we are building a prosperous future.
                    </p>
                    
                    <div className="mt-6 text-right">
                      <p className="font-bold text-gray-800">Einstein Mokua</p>
                      <p className="text-blue-600">Founder, KMS SACCO</p>
                    </div>
                  </div>
                  
                  <FaQuoteRight className="text-blue-100 text-4xl absolute bottom-4 right-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 mb-16">
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
