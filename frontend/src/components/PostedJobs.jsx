import React, { useEffect, useState } from 'react'
import JobTable from './JobTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import Navbar from './shared/Navbar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchAdminJobs } from '@/redux/jobSlice';

function PostedJobs() {
    useGetAllAdminJobs();
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchAdminJobs(text));
    }, [text])
    
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input value={text} onChange={(e) => setText(e.target.value)} className="w-[30%]" placeholder="Filter by company name & role" />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <JobTable />
            </div>
        </div>
    )
}

export default PostedJobs
