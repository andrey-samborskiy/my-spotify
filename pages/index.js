import Head from 'next/head'
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Home() {

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        console.log(session);
    })

    const onClick = () => {
        router.push('/login')
    }

    return (
        <div className="bg-black w-full h-screen">
            <div className='flex justify-between items-center'>
                <nav>
                    <ul className='text-white flex gap-8 pl-8 font-bold'>
                        <li><a className='hover:text-green-500' href="#">Home</a></li>
                        <li><a className='hover:text-green-500' href="#" onClick={onClick}>Profile</a></li>
                    </ul>
                </nav>
                { session &&
                    <div className='flex items-center py-2 px-8'>
                        <div className="text-white font-bold mr-4 ">{ session.user?.name }</div>
                        <div className='w-[40px] rounded-full overflow-hidden border-2 border-green-500'><img src={ session.user?.image } alt=""/></div>
                    </div>
                }
            </div>
        </div>
    )
}
