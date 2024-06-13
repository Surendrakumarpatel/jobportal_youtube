import React from 'react';
import { motion } from 'framer-motion';

const Jobnotfound = () => {
  return (
    <div className='flex-1 flex items-center justify-center mx-auto'>
      <motion.img
        className='w-[50%]'
        src="./notfound.jpg"
        alt="Job not found"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

export default Jobnotfound;