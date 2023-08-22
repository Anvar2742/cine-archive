import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetApiData from "../hooks/useGetApiData";
import { useEffectOnce } from "../hooks/useEffectOnce";
import SingleTitleCard from "../components/SingleTitleCard";

const Catalog = () => {
    const location = useLocation();
    const getMovieEffectRan = useRef(true);
    const [titleArr, setTitleArr] = useState(null);
    const [titleElements, setTitleElements] = useState(null);

    const getMovies = useGetApiData("movie", "now_playing", "1");

    useEffectOnce(() => {
        if (getMovieEffectRan.current) {
            getMovies().then((results) => {
                console.log(results);
                setTitleArr(results);
            });
        }
    }, [location?.pathname]);

    const addToFavoritesClient = (titleId) => {
        const likedTitle = titleArr.filter((el) => el.id === titleId);
        setTitleArr((prevArr) => {
            return prevArr.map((elMap) => {
                if (titleId === elMap.id) {
                    return {
                        ...elMap,
                        isFav: !elMap.isFav,
                    };
                } else {
                    return elMap;
                }
            });
        });
    };

    useEffect(() => {
        if (titleArr) {
            setTitleElements(() => {
                return titleArr.map((el) => {
                    return (
                        <SingleTitleCard
                            key={el?.id}
                            title={el}
                            mediaType={"movie"}
                            addToFavoritesClient={addToFavoritesClient}
                        />
                    );
                });
            });
        }
    }, [titleArr]);

    if (!titleElements) return <div>Loading...</div>;

    return (
        <div className="container mx-auto">
            <h1 className=" text-4xl font-bold my-12">Now playing</h1>
            <div className=" grid grid-cols-3 gap-8">{titleElements}</div>
        </div>
    );
};

export default Catalog;
