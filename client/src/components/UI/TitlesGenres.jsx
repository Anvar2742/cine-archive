import { useEffect, useState } from "react";

const TitlesGenres = ({ genresArr }) => {
    const [genresEls, setGenresEls] = useState(null);
    useEffect(() => {
        if (genresArr?.length) {
            setGenresEls(
                genresArr.map((el) => {
                    return (
                        <button
                            className="border rounded-full py-1 px-4 transition-colors hover:bg-sec"
                            key={el?.id}
                        >
                            {el?.name}
                        </button>
                    );
                })
            );
        }
    }, [genresArr]);
    return (
        <div className="flex flex-wrap gap-2 justify-center">{genresEls}</div>
    );
};

export default TitlesGenres;
