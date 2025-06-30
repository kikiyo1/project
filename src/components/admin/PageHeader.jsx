
import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{title}</h1>
      {subtitle && <p className="text-gray-300 text-lg">{subtitle}</p>}
    </motion.div>
  );
};

export default PageHeader;
