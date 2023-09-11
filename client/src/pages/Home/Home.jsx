import { useEffect, useState } from "react";
import Slider from "../../components/UI/Slider";
import HomeHero from "./Hero";
import { useLocation } from "react-router-dom";
import useGetApiData from "../../hooks/api/useGetApiData";
import Loader from "../../components/UI/Loader";
import useGetGenres from "../../hooks/api/useGetGenres";
import TitlesGenres from "../../components/UI/TitlesGenres";

const Home = () => {
    const [titlesArr, setTitlesArr] = useState(null);
    const [genresArr, setGenresArr] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const getMovies = useGetApiData();
    const getGenres = useGetGenres();

    const updateTitlesArr = (results) => {
        setTitlesArr(results);
    };

    useEffect(() => {
        getMovies("movie", "now_playing", 1, 300, 780)
            .then((data) => {
                setTitlesArr(data?.results);
            })
            .finally(() => {
                setIsLoading(false);
            });
        getGenres("movie").then((data) => {
            setGenresArr(data?.genres);
        });
    }, [location?.pathname]);

    // if (isLoading) return <Loader />;
    return (
        <>
            <HomeHero titlesArr={titlesArr} updateTitlesArr={updateTitlesArr} />
            <Slider
                heading="Top rated"
                link="/top_rated"
                listType="top_rated"
                showDate={false}
            />
            <Slider
                heading="Popular"
                link="/popular"
                listType="popular"
                showDate={false}
            />
        </>
    );
};

export default Home;
