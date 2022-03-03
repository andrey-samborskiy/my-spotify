import {BiHeart, BiHomeAlt, BiLibrary, BiPlusCircle, BiPodcast, BiSearch, BiExit} from "react-icons/bi";
import {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";

function Sidebar() {

    const {data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const spotifyApi = useSpotify();

    useEffect(() => {

        if (session) {
            if (spotifyApi.getAccessToken()) {
                spotifyApi.getUserPlaylists().then((data) => {
                    setPlaylists(data.body.items);

                    if (!playlistId) {
                        setPlaylistId(data.body.items[0].id)
                    }
                })
            }
        }

    }, [session, spotifyApi])

    return <div className="text-white font-bold flex-grow-0 flex-shrink-0 basis-[240px] py-4 pr-4">
        <ul className="flex flex-col gap-3">
            { session && <li><a onClick={ () => { signOut(); } } className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiExit size="30"/> Logout</a></li> }
            <li><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiHomeAlt size="30"/> Home</a>
            </li>
            <li><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiSearch
                size="30"/> Search</a></li>
            <li><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiLibrary size="30"/>Your
                Library</a></li>
        </ul>

        <ul className="flex flex-col gap-3 mt-6 border-b border-slate-700 pb-4 w-full">
            <li><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiPlusCircle
                size={30}/> Create Playlist</a></li>
            <li><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiHeart size={30}/> Liked
                Songs</a></li>
            <li><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#"><BiPodcast size={30}/> Your
                Episodes</a></li>
        </ul>

        <ul className="flex flex-col gap-4 mt-4 w-full font-normal">
            { playlists.map( playlist => (
                <li key={playlist.id} onClick={() => { setPlaylistId(playlist.id) }}><a className="flex gap-4 items-center opacity-60 hover:opacity-100" href="#">{playlist.name}</a></li>
            ))}
        </ul>
    </div>;
}

export default Sidebar;
