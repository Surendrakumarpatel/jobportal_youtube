import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchText } from '@/redux/jobSlice';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs?.length})</h1>
        <div className='flex-1 h-[88vh] overflow-y-auto  no-scrollbar pb-5'>
          <div className='grid grid-cols-3 gap-4'>

            {
              allJobs?.length !== 0 ? allJobs?.map((job) => {
                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                )
              }) : <span>No Job Found</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse