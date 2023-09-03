import { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import HomeHero from "./Hero";
import { useLocation } from "react-router-dom";
import useGetApiData from "../../hooks/api/useGetApiData";
import Loader from "../../components/Loader";

const Home = () => {
    const [titlesArr, setTitlesArr] = useState(null);
    const location = useLocation();
    const getMovies = useGetApiData();
    const [isLoading, setIsLoading] = useState(true);

    const updateTitlesArr = (results) => {
        setTitlesArr(results);
    };

    useEffect(() => {
        getMovies("movie", "now_playing", 1)
            .then((data) => {
                setTitlesArr(data?.results);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [location?.pathname]);

    if (isLoading) return <Loader />;
    return (
        <>
            <HomeHero titlesArr={titlesArr} updateTitlesArr={updateTitlesArr} />
            <Slider heading="Currently playing" link="/top_rated" titlesArr={titlesArr} />
        </>
    );
};

export default Home;
