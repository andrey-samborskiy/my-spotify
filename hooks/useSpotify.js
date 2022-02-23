import {useEffect} from "react";
import {signIn, useSession} from "next-auth/react";
import spotifyApi from "../lib/spotify";

const UseSpotify = () => {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken)
         }
    }, [session])

    return spotifyApi;
};

export default UseSpotify;
