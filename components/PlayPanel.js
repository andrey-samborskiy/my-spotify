import {useRecoilValue} from "recoil";
import {songIdState} from "../atoms/songAtom";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

import { BsFillPlayCircleFill, BsFillVolumeDownFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs"
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi"

const PlayPanel = () => {

    const songId = useRecoilValue(songIdState);
    const {data: session } = useSession();
    const spotifyApi = useSpotify();
    const [song, setSong] = useState(null)

    useEffect(() => {
        if (session && songId) {
            if (spotifyApi.getAccessToken()) {
                spotifyApi.getTrack(songId).then(data => {
                    setSong(data.body);
                    console.log(data.body);
                })
            }
        }
    }, [songId, session])

    if (!song) {
        return null;
    }

    return <div className='absolute text-white bottom-0 left-0 py-2 px-4 border-t border-gray-100 w-full grid grid-cols-3'>
        <div className='flex space-x-4 items-center' >
            <div>
                <img className='w-10 h-10' src={song.album?.images[0].url} alt=""/>
            </div>
            <div>
                <p>{song.name}</p>
                <p>{song?.artists[0].name}</p>
            </div>
        </div>
        <div className='text-white flex justify-center items-center gap-2'>
            <button><BiSkipPreviousCircle size={30} /></button>
            <button><BsFillPlayCircleFill size={40} /></button>
            <button><BiSkipNextCircle size={30} /></button>
        </div>
        <div className='text-white flex justify-end items-center gap-2'>
            <button><BsFillVolumeDownFill size={20} /></button>
            <input type="range" min={0} max={100} className='bg-gray-500'/>
            <button><BsFillVolumeUpFill size={20} /></button>
        </div>
    </div>
}

export default PlayPanel;
