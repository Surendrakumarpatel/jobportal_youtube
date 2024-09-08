import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

const Applicants = () => {
    const params = useParams();
    const id = params.id;
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://jobportal-youtube.onrender.com/api/v1/application/${id}/applicants`);
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-medium text-xl my-5'>Applicants ({applicants?.applications.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants