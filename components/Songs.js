import Song from "./Song";

const Songs = ({ tracks }) => {

    return (
        <div className='flex flex-col space-y-4 text-gray-400'>
            { tracks.map((item, i) => (
                <Song key={item.track.id} order={ i } track={ item } />
            ))}
        </div>
    );
};

export default Songs;
