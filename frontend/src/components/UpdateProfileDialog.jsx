import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAuthUser, setLoading } from "@/redux/authSlice"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

export function UpdateProfileDialog({ open, setOpen }) {
    const { authUser, loading } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: authUser?.fullname,
        email: authUser?.email,
        phoneNumber: authUser?.phoneNumber,
        bio: authUser?.profile?.bio,
        skills: authUser?.profile?.skills?.map(skill => skill),
        file: authUser?.profile?.resume,
    });
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post("https://jobportal-youtube.onrender.com/api/v1/user/profile/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={input.email}
                                name="email"
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <Input
                                id="number"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                value={input.bio}
                                name="bio"
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                value={input.skills}
                                name="skills"
                                onChange={changeHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Resume
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                name="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        {
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Update</Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
