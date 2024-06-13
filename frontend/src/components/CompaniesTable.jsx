import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";


const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies && companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);


  return (
    <Table>
      <TableCaption>A list of your recent registered companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterCompany?.map((company) => (
          <motion.tr
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            key={company._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={company?.logo}/>
              </Avatar>
            </TableCell>
            <TableCell>{company?.name}</TableCell>
            <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="float-right cursor-pointer">
              <Popover>
                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                <PopoverContent className="w-32">
                  <div onClick={() => {
                    navigate(`/admin/companies/${company._id}`);
                  }} className="flex w-fit items-center gap-2 cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  )
}
export default CompaniesTable;
