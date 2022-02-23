import { getProviders, signIn, signOut, useSession } from "next-auth/react";

function Login({ providers }) {

    const {data: session} = useSession();

    if (session) {
        return (
            <div className='flex flex-col justify-center items-center h-screen bg-black'>
                <div className='overflow-hidden rounded-full w-[100px] h-[100px] border-2 border-green-500'><img src={session.user?.image}/></div>
                <div className='text-white mt-4'>You logged in as <span className='font-bold'>{session.user?.name}</span></div>
                <button className='bg-slate-200 px-4 py-2 mt-4 rounded-full font-medium hover:bg-slate-300' onClick={() => signOut()}>Logout</button>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-black'>
            <h1 className='text-3xl font-bold text-white'>Spotify</h1>
            { Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button className='bg-green-500 rounded-full py-2 px-4 mt-4 text-white font-medium hover:bg-green-900 transition-all duration-500' onClick={() => signIn(provider.id, {callbackUrl: 'http://localhost:3000'})}>Login with {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}
