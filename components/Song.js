import {convertMsToMinSec} from "../lib/utils";
import {useRecoilState} from "recoil";
import {songIdState} from "../atoms/songAtom";

const Song = ({track, order}) => {

    const [songId, setSongId] = useRecoilState(songIdState);

    return (
        <div onClick={() => {
            console.log(track.track.id);
            setSongId(track.track.id);
        }} className='font-normal w-full space-x-4 cursor-pointer hover:bg-gray-700 py-2 rounded-md'>
            <div className='grid grid-cols-3 pl-4'>
                <div className='flex w-full items-center space-x-4'>
                    <div>{ order + 1 }</div>
                    <div className='basis-10 shrink-0'>
                        <img className='w-10 h-10' src={track?.track.album.images[0]?.url} alt=""/>
                    </div>
                    <div>
                        <p className='text-white'>{ track.track?.name }</p>
                        <p>{ track.track?.artists[0]?.name }</p>
                    </div>
                </div>
                <div className='flex items-center justify-end text-right '>
                    <p>{ track.track?.album.name }</p>
                </div>
                <div className='flex items-center justify-end pr-4'>
                    <p>{ convertMsToMinSec(track.track?.duration_ms) }</p>
                </div>
            </div>
        </div>
    );
};

export default Song;
