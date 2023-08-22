import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetApiData from "../hooks/useGetApiData";
import { useEffectOnce } from "../hooks/useEffectOnce";
import SingleTitleCard from "../components/SingleTitleCard";

const Catalog = () => {
    const location = useLocation();
    const getMovieEffectRan = useRef(true);
    const [titleElements, setTitleElements] = useState(null);

    const getMovies = useGetApiData("movie", "now_playing", "1");

    useEffectOnce(() => {
        if (getMovieEffectRan.current) {
            getMovies().then((results) => {
                console.log(results);
                setTitleElements(() => {
                    return results.map((el) => {
                        return (
                            <SingleTitleCard
                                key={el?.id}
                                title={el}
                                mediaType={"movie"}
                            />
                        );
                    });
                });
            });
        }
    }, [location?.pathname]);

    if (!titleElements) return <div>Loading...</div>;

    return (
        <div className="container mx-auto">
            <h1>Discover new titles</h1>
            <div className=" grid grid-cols-3 gap-8">{titleElements}</div>
        </div>
    );
};

export default Catalog;
