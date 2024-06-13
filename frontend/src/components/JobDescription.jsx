import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setSingleJobById } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';

const JobDescription = () => {
  const { singleJobById } = useSelector(store => store.job);
  const { authUser } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJobById?.applications?.some(application => application.applicant === authUser?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();

  const applyJobHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${params.id}`);
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedJob = { ...singleJobById, applications: [...singleJobById.applications, { applicant: authUser._id }] };
        dispatch(setSingleJobById(updatedJob)); // Update the Redux state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8000/api/v1/job/${params.id}`);
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === authUser?._id)); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl '>{singleJobById?.title}</h1>
          <div className='flex items-center gap-2 my-2'>
            <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>{singleJobById?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{singleJobById?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant={'ghost'}>{singleJobById?.salary} LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className='my-4'>
        <h1 className='border-b-2 pb-1 border-b-gray-300 font-medium'>Job Description</h1>
      </div>
      <div>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.experienceLevel}</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJobById?.createdAt.split("T")[0]}</span></h1>
      </div>
      <div>
        {/* <ApplyJobDialog open={open} setOpen={setOpen} /> */}
      </div>
    </div>
  );
}

export default JobDescription;
