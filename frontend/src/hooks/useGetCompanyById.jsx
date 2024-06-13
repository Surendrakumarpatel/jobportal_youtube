import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanyDetails = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8000/api/v1/company/getcompany/${id}`);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log("Error occured while fetching company details",error);
            }
        };
        fetchCompanyDetails();
    },[id,dispatch])
};
export default useGetCompanyById;