import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`https://jobportal-youtube.onrender.com/api/v1/application/status/${id}/update`, {status}, {
                withCredentials: true
            });
            if(res.data.success){ 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applicants && applicants?.applications?.map((item) => (
                    <motion.tr
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        exit={{ x: -100 }}
                        transition={{ duration: 0.5 }}
                        key={item?._id}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell className="text-blue-600 cursor-pointer"><a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                        <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell className="float-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {
                                        shortlistingStatus.map((sts, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => statusHandler(sts, item?._id)}
                                                    className="flex w-fit items-center gap-2 my-2 cursor-pointer">
                                                    <span>{sts}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </motion.tr>
                ))}
            </TableBody>
        </Table>
    )
}
export default ApplicantsTable;
