import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Contact, Mail, Pen } from 'lucide-react'
import ApplicationTable from './ApplicationTable'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { UpdateProfileDialog } from './UpdateProfileDialog'
import { useNavigate } from 'react-router-dom'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Label } from './ui/label'
import { Input } from './ui/input'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { authUser } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const resume = true;
    // protect route
    useEffect(() => {
        if (!authUser) {
            navigate("/");
        }
    }, []);


    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24" >
                            <AvatarImage src = {authUser?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{authUser?.fullname}</h1>
                            <p className=''>{`${authUser?.profile?.bio ? authUser?.profile?.bio : 'Add your bio here'}`}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail className='h-4 w-4' />
                        <span>{authUser?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact className='h-4 w-4' />
                        <span>{authUser?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='my-2 font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>

                        {
                            authUser?.profile?.skills.length !== 0 ? authUser?.profile?.skills?.map((skill, index) => <Badge key={index}>{skill}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        authUser?.profile?.resume ? (<a target='blank' href={authUser?.profile?.resume} className='w-full text-blue-500 hover:underline cursor-pointer'>{authUser?.profile?.resumeOriginalName}</a>) : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-xl font-bold p-5'>Applied Jobs</h1>
                <ApplicationTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile