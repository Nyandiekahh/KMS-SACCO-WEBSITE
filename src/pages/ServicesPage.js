import React from 'react';
import { motion } from 'framer-motion';
import { FaSackDollar, FaHandHoldingDollar, FaGraduationCap, FaBuildingColumns, FaShieldHalved, FaFileInvoiceDollar } from 'react-icons/fa6';

const ServicesPage = () => {
  const mainServices = [
    {
      icon: <FaSackDollar />,
      title: "Savings Accounts",
      description: "Build a stable financial future with our competitive savings accounts designed to help you grow your wealth over time.",
      details: [
        "Minimum monthly contribution of Ksh 1,000",
        "Competitive interest rates",
        "Flexible withdrawal options",
        "Secure online access to your account"
      ]
    },
    {
      icon: <FaHandHoldingDollar />,
      title: "Loan Products",
      description: "Access affordable credit solutions to help you achieve your goals, whether it's education, business, or personal development.",
      details: [
        "Borrow up to three times your savings",
        "Competitive interest rates at 20% monthly",
        "Flexible repayment terms",
        "Quick processing and disbursement"
      ]
    },
    {
      icon: <FaGraduationCap />,
      title: "Financial Education",
      description: "Gain valuable knowledge and skills to make informed financial decisions through our comprehensive education programs.",
      details: [
        "Regular financial literacy workshops",
        "Personal finance management courses",
        "Investment strategy seminars",
        "One-on-one financial counseling"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: <FaBuildingColumns />,
      title: "Investment Opportunities",
      description: "Explore diverse investment options to grow your wealth beyond traditional savings accounts."
    },
    {
      icon: <FaShieldHalved />,
      title: "Financial Protection",
      description: "Safeguard your financial future with our protection plans designed to provide security for you and your loved ones."
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: "Financial Planning",
      description: "Work with our experts to create a personalized financial plan aligned with your life goals."
    }
  ];

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
              Our Services
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Comprehensive financial solutions designed to help you achieve prosperity and security.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Core Financial Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our range of financial services tailored to meet your needs and help you achieve your financial goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="bg-blue-50 p-6">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-3xl shadow-sm mx-auto">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <h4 className="text-lg font-medium mb-3 text-gray-800">Key Features:</h4>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Additional Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Beyond our core offerings, we provide these specialized services to enhance your financial wellness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="text-blue-600 text-3xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our straightforward process ensures you can access our services with ease.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Become a Member",
                description: "Join KMS SACCO by completing the application process and making your initial deposit."
              },
              {
                step: "02",
                title: "Regular Savings",
                description: "Contribute to your savings account monthly to build your financial base."
              },
              {
                step: "03",
                title: "Access Services",
                description: "Utilize our range of financial services tailored to your needs."
              },
              {
                step: "04",
                title: "Achieve Your Goals",
                description: "Work with our team to track progress and reach your financial milestones."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-6 h-full border-2 border-gray-100 hover:border-blue-500 transition-colors duration-300 z-10 relative">
                  <div className="text-5xl font-bold text-blue-100 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Financial Journey?
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Join KMS SACCO today and take the first step toward financial empowerment.
            </motion.p>
            <motion.button
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md text-lg font-bold shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Member
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;