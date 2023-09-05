const Genres = ({ genres }) => {
    return (
        <div className="mt-4">
            <h3 className=" text-lg">Genres</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {genres.map((genre) => {
                    return (
                        <div
                            key={genre.id}
                            className=" bg-sec py-1 px-3 rounded-full"
                        >
                            {genre.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Genres;
