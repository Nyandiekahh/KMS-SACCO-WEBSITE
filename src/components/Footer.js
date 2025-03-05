import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">KMS SACCO</h3>
            <p className="text-blue-200 mb-4">
              Building financial futures together through inclusion, participation, and social responsibility.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-blue-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#values" className="text-blue-200 hover:text-white transition-colors">Our Values</a></li>
              <li><a href="#services" className="text-blue-200 hover:text-white transition-colors">Services</a></li>
              <li><a href="#membership" className="text-blue-200 hover:text-white transition-colors">Membership</a></li>
              <li><a href="#contact" className="text-blue-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Savings Accounts</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Loan Products</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Financial Education</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Investment Options</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:kms2022.sacco@gmail.com" className="text-blue-200 hover:text-white transition-colors">
                kms2022.sacco@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                <a href="tel:+254796611599" className="text-blue-200 hover:text-white transition-colors">
                  +254 796 611 599
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-300 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} KMS SACCO Limited. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;