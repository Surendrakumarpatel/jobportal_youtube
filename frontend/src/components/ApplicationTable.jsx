import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux"
import { Badge } from "./ui/badge";
 
const ApplicationTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.application);
    return (
        <Table className="bg-white border border-gray-200">
            <TableCaption className="my-2">A list of your recent applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allAppliedJobs && allAppliedJobs?.map((appliedjob) => (
                    <TableRow key={appliedjob?._id}>
                        <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedjob?.job?.title}</TableCell>
                        <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className={`${appliedjob?.status === 'rejected' ? 'bg-red-400' : appliedjob?.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedjob?.status?.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default ApplicationTable;
