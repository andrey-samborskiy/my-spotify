import {getSession} from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import PlayPanel from "../components/PlayPanel";

export default function Home() {

    return (
        <div className="bg-black w-full h-screen pl-4 pb-32 box flex justify-stretch box-border overflow-hidden">
            <Sidebar/>
            <Center />
            <PlayPanel />
        </div>
    )
}

export async function getServerProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session
        }
    }
}
