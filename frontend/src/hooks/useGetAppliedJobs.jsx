import { setAllAppliedJobs } from '@/redux/applicationSlice';
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get('https://jobportal-youtube.onrender.com/api/v1/application/get');
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
}

export default useGetAppliedJobs