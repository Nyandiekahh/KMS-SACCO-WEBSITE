import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaRegCreditCard, FaPiggyBank, FaUsers, FaRegIdCard } from 'react-icons/fa';

const MembershipPage = () => {
  const membershipBenefits = [
    {
      icon: <FaRegCreditCard />,
      title: "Access to Loans",
      description: "Borrow up to three times your savings with competitive interest rates and flexible repayment options."
    },
    {
      icon: <FaPiggyBank />,
      title: "Competitive Returns",
      description: "Earn attractive returns on your savings, helping you grow your wealth steadily over time."
    },
    {
      icon: <FaUsers />,
      title: "Democratic Participation",
      description: "Have a voice in the SACCO's governance through voting rights and participation in annual general meetings."
    },
    {
      icon: <FaRegIdCard />,
      title: "Financial Education",
      description: "Access exclusive financial literacy programs designed to enhance your financial knowledge and decision-making."
    }
  ];

  const eligibilityCriteria = [
    "Age: You must be at least 18 years old to apply for membership",
    "Residence: While residency in Kenya is not mandatory, you should demonstrate a strong connection to the Kenyan community",
    "Character: You should exhibit a history of financial responsibility and ethical conduct",
    "Commitment: Willingness to participate in SACCO activities and meet financial obligations"
  ];

  const applicationSteps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Send an email to kms2022.sacco@gmail.com expressing your interest in joining and including a brief introduction."
    },
    {
      number: "02",
      title: "Pay Joining Fee",
      description: "Pay a one-time, non-refundable joining fee of Ksh 200 following the payment instructions provided."
    },
    {
      number: "03",
      title: "Initial Deposit",
      description: "Make a minimum initial deposit of Ksh 1,000 into your savings account to activate your membership."
    },
    {
      number: "04",
      title: "Review Process",
      description: "Our Board of Directors will review your application, and you'll be notified of the decision within 5 business days."
    }
  ];

  const testimonials = [
    {
      quote: "Joining KMS SACCO has transformed my financial outlook. The loan I received helped me establish my small business, and now I'm financially independent.",
      name: "Jane Muthoni",
      role: "Small Business Owner",
      avatar: "/api/placeholder/80/80"
    },
    {
      quote: "The savings program at KMS SACCO helped me build the discipline to save regularly. Now I've achieved my goal of buying land for my family.",
      name: "Michael Odhiambo",
      role: "Teacher",
      avatar: "/api/placeholder/80/80"
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
              Become a Member
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join our community of financially empowered individuals and take control of your financial future.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Membership Benefits</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the advantages of being a KMS SACCO member and how it can transform your financial journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {membershipBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-blue-600 text-3xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="bg-gray-50 py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Membership Eligibility</h2>
              <p className="text-gray-600 mb-6">
                KMS SACCO membership is open to individuals who meet our eligibility criteria and share our values of financial inclusion, member participation, and social responsibility.
              </p>
              
              <ul className="space-y-4">
                {eligibilityCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaUserPlus className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Join Our Community</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Ready to become a member? Check if you meet our eligibility criteria and follow our simple application process to join.
              </p>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500">Minimum Initial Deposit</p>
                  <p className="text-xl font-bold text-gray-800">Ksh 1,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joining Fee</p>
                  <p className="text-xl font-bold text-gray-800">Ksh 200</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Saving</p>
                  <p className="text-xl font-bold text-gray-800">Ksh 1,000</p>
                </div>
              </div>
              
              <motion.button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply for Membership
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Application Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to become a member of KMS SACCO and start your journey to financial empowerment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {applicationSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-6 h-full border-2 border-gray-100 hover:border-blue-500 transition-colors duration-300">
                <div className="text-5xl font-bold text-blue-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < applicationSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">What Our Members Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our members about how KMS SACCO has helped them achieve their financial goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-blue-100" 
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
                <div>
                  <svg className="w-8 h-8 text-blue-100 mb-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"/>
                  </svg>
                  <p className="text-gray-600 mb-2">{testimonial.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about KMS SACCO membership.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {[
            {
              question: "What are the benefits of joining KMS SACCO?",
              answer: "As a member, you'll enjoy access to affordable loans, competitive returns on savings, financial education programs, and the opportunity to participate in the SACCO's democratic governance."
            },
            {
              question: "How much do I need to save monthly?",
              answer: "Members are required to save a minimum of Ksh 1,000 per month. This helps build your savings and increases your loan eligibility."
            },
            {
              question: "When can I apply for a loan?",
              answer: "You become eligible for a loan after being an active member for at least six months and maintaining regular savings contributions."
            },
            {
              question: "How is the loan amount determined?",
              answer: "You can borrow up to three times your savings amount, subject to approval and your ability to repay."
            },
            {
              question: "Can I withdraw my savings?",
              answer: "Yes, members can withdraw their savings with a 30-day notice period, though we encourage long-term saving for better financial growth."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6 bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">{faq.question}</h3>
              </div>
              <div className="p-5 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
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
              Apply for Membership
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;