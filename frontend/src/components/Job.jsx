import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ApplyJobDialog } from './ApplyJobDialog'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 3600));
    }
 
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button size="icon" className="rounded-full" variant="secondary"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button size='icon' variant="outline" className="p-6">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>{job?.position} positons</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant={'ghost'}>{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="rounded-lg">Details</Button>
                <Button className="bg-[#7209b7] rounded-lg">Save For Later</Button>
            </div>
            <div>
                <ApplyJobDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Job