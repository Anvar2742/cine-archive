import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useGetApiData from "../hooks/useGetApiData";

const Catalog = () => {
    const location = useLocation();
    const getMovieEffectRan = useRef(true);

    const getMovies = useGetApiData("movie", "now_playing", "1");

    useEffect(() => {
        if (getMovieEffectRan.current) {
            getMovies();
        }

        return () => {
            getMovieEffectRan.current = false;
        };
    }, [location?.pathname]);

    return (
        <div className="container mx-auto">
            <h1>Discover new titles</h1>
        </div>
    );
};

export default Catalog;
