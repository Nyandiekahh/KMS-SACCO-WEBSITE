import React from 'react';
import { motion } from 'framer-motion';

const LogoSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg"
          >
            <img 
              src="/kms_Colored_SVG-01-01.svg" 
              alt="KMS SACCO Logo" 
              className="w-full h-auto"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-4xl md:text-5xl text-gray-800 font-bold text-center"
          >
            KMS SACCO Limited
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl text-gray-600 max-w-3xl text-center"
          >
            Building financial futures together through inclusion, participation, and social responsibility.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;