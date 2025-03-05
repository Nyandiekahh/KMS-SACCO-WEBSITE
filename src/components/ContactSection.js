import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about KMS SACCO? We're here to help! Reach out to us through any of the channels below.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-3xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <a href="mailto:kms2022.sacco@gmail.com" className="text-blue-600 font-medium hover:underline">
                    kms2022.sacco@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <a href="tel:+254796611599" className="text-blue-600 font-medium hover:underline">
                      +254 796 611 599
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-xl font-bold mb-4">Office Hours</h4>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Monday - Friday:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Membership Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                    placeholder="I'm interested in learning more about..."
                  ></textarea>
                </div>
              </div>
              
              <motion.button
                className="w-full mt-6 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;