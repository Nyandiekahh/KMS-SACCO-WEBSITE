import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Have questions or need assistance? We're here to help you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">For general inquiries, membership applications, and support</p>
                  <a href="mailto:kufanyanambayasacco@gmail.com" className="text-blue-600 hover:underline">kufanyanambayasacco@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <FaPhone className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Call Us</h3>
                  <p className="text-gray-600 mb-2">Our customer service team is available during business hours</p>
                  <a href="tel:+254796611599" className="text-blue-600 hover:underline">+254 796 611 599</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <FaWhatsapp className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">WhatsApp</h3>
                  <p className="text-gray-600 mb-2">For quick inquiries and support</p>
                  <a href="https://wa.me/254796611599" className="text-blue-600 hover:underline">+254 796 611 599</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <FaClock className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Business Hours</h3>
                  <p className="text-gray-600 mb-1">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600 mb-1">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-600">Sunday & Public Holidays: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full rounded-lg bg-white/20 border border-white/10 text-white placeholder-blue-100/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full rounded-lg bg-white/20 border border-white/10 text-white placeholder-blue-100/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full rounded-lg bg-white/20 border border-white/10 text-white placeholder-blue-100/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-100 mb-1">Subject</label>
                  <select 
                    id="subject" 
                    className="w-full rounded-lg bg-white/20 border border-white/10 text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" className="bg-blue-600">Select a subject</option>
                    <option value="membership" className="bg-blue-600">Membership Inquiry</option>
                    <option value="loan" className="bg-blue-600">Loan Information</option>
                    <option value="savings" className="bg-blue-600">Savings Account</option>
                    <option value="support" className="bg-blue-600">Technical Support</option>
                    <option value="other" className="bg-blue-600">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full rounded-lg bg-white/20 border border-white/10 text-white placeholder-blue-100/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about contacting and communicating with KMS SACCO.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How quickly will I receive a response to my inquiry?",
                answer: "We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our customer service line during business hours."
              },
              {
                question: "Can I visit your office in person?",
                answer: "Yes, members and prospective members are welcome to visit our office during business hours. We recommend scheduling an appointment for extended consultations."
              },
              {
                question: "How do I update my contact information?",
                answer: "You can update your contact information by sending an email to kufanyanambayasacco@gmail.com with your membership number and the new contact details, or by calling our customer service line."
              },
              {
                question: "Can I request documents or statements via email?",
                answer: "Yes, you can request documents or statements by sending an email with your membership number and specific request. For security reasons, we may require additional verification."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4 bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800">{faq.question}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Stay Updated</h2>
            <p className="text-gray-600">
              Subscribe to our newsletter to receive updates, financial tips, and exclusive offers.
            </p>
          </div>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-md whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            By subscribing, you agree to receive marketing communications from KMS SACCO. You can unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;