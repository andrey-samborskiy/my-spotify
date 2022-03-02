import {AiFillCaretDown} from "react-icons/ai";
import {BiTimeFive} from "react-icons/bi";
import {signOut, useSession} from "next-auth/react";
import {useRecoilValue} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import {useEffect, useState} from "react";
import Songs from "./Songs";

const Center = () => {

    const { data: session } = useSession();
    const playlistId = useRecoilValue(playlistIdState);
    const spotifyApi = useSpotify();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        if (session) {
            if (spotifyApi.getAccessToken() && playlistId) {
                spotifyApi.getPlaylist(playlistId).then(data => {
                    setPlaylist(data.body)
                })
            }
        }
    }, [session, spotifyApi, playlistId])

    return (
        <div className='relative text-white font-bold w-full'>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b to-black from-gray-300'/>
            <div className='absolute top-0 left-0 w-full h-full '>
                <div className='flex justify-end p-4'>
                    { session &&
                        <div onClick={() => { signOut() }} className='flex items-center bg-black bg-opacity-60 hover:bg-opacity-80 cursor-pointer rounded-full h-[32px] pr-3'>
                            <div className='w-[30px] mr-2 rounded-full overflow-hidden'><img src={ session.user?.image } alt=""/></div>
                            <div className="text-white font-bold mr-2 ">{ session.user?.name }</div>
                            <AiFillCaretDown />
                        </div>
                    }
                </div>
                { playlist && <div className='flex flex-col h-full'>
                    <div className='flex items-end p-8'>
                        <div className='mr-6'>
                            <img className='drop-shadow-xl w-[200px]' src={playlist?.images[0].url} alt=""/>
                        </div>
                        <div>
                            <span className=''>PLAYLIST</span>
                            <h3 className='leading-none text-[50px] mb-4'>{playlist?.name}</h3>
                            <p>{playlist?.owner?.display_name} • {playlist?.tracks.total} songs</p>
                        </div>
                    </div>
                    <div className='h-full bg-black bg-opacity-20 p-8 overflow-y-scroll scrollbar-hide'>
                        <Songs tracks={ playlist?.tracks?.items || [] }/>
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default Center;
