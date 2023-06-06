import {userRouter} from 'next/react'
export default function title ()
{
    const router=userRouter();
    const {title}=router.query;
    return <p>Movie: {title}</p>
}