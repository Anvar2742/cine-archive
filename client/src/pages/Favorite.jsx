import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/api/useAxiosPrivate";
import SingleTitleCard from "./../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";
import useGetApiData from "../hooks/api/useGetApiData";

const Favorite = () => {
    const [favTitleArr, setFavTitleArr] = useState([]);
    const [favElements, setFavElements] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const getMovies = useGetApiData("movie", "now_playing", "1");

    const getFavorites = async () => {
        try {
            const resp = await axiosPrivate.get("/user");
            const favoriteTitleIds = await resp?.data?.favoriteTitleIds;
            await getMovies().then((results) => {
                console.log(results);
                let favArr = [];
                favoriteTitleIds.forEach((favoriteId) => {
                    const resultIndex = results.indexOf(favoriteId);
                    console.log(favoriteId);
                    if (!(resultIndex === -1)) {
                        const favTitle = results.splice(resultIndex, 1);
                        favArr.push(favTitle);
                    }
                });
                console.log(favArr);
                setFavTitleArr(favArr);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getFavorites();
    }, [location?.pathname]);

    useEffect(() => {
        console.log(favTitleArr);
        if (favTitleArr.length) {
            setFavElements(
                favTitleArr.map((el) => {
                    return (
                        <SingleTitleCard
                            key={el.id}
                            title={el}
                            mediaType={"movie"}
                            addToFavoritesClient={addToFavoritesClient}
                        />
                    );
                })
            );
        }
    }, [favTitleArr]);

    return (
        <div className="container mx-auto">
            <h1 className=" text-4xl font-bold my-12">Now playing</h1>
            {favElements}
        </div>
    );
};

export default Favorite;
