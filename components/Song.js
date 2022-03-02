import {convertMsToMinSec} from "../lib/utils";

const Song = ({track, order}) => {

    console.log(track)

    return (
        <div className='flex font-normal w-full items-center space-x-4 cursor-pointer hover:bg-gray-700 -mx-4 px-4'>
            <div>{ order + 1 }</div>
            <div>
                <img className='w-10 h-10' src={track?.track.album.images[0]?.url} alt=""/>
            </div>

            <div className='basis-[260px]'>
                <p className='text-white'>{ track.track?.name }</p>
                <p>{ track.track?.artists[0]?.name }</p>
            </div>
            <div className='basis-[260px]'>
                <p>{ track.track?.album.name }</p>
            </div>
            <div className='justify-self-end'>
                <p>{ convertMsToMinSec(track.track?.duration_ms) }</p>
            </div>
        </div>
    );
};

export default Song;
