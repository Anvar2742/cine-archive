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
    const getMovies = useGetApiData();

    const addRemoveFavoritesClient = (titleId) => {
        setFavTitleArr((prevArr) => {
            return prevArr.filter((elMap) => {
                return !(titleId === elMap.id);
            });
        });
    };

    const getFavorites = async () => {
        try {
            // const favoriteResp = getMovies()
            setFavTitleArr(favoriteTitles);
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getFavorites();
    }, [location?.pathname]);

    useEffect(() => {
        if (favTitleArr?.length) {
            setFavElements(
                favTitleArr.map((el) => {
                    return (
                        <SingleTitleCard
                            key={el.id}
                            title={el}
                            mediaType={"movie"}
                            addRemoveFavoritesClient={addRemoveFavoritesClient}
                        />
                    );
                })
            );
        } else {
            setFavElements("No favorites");
        }
    }, [favTitleArr]);

    return (
        <div className="container mx-auto">
            <h1 className=" text-4xl font-bold my-12">My favorites</h1>
            <div className=" grid grid-cols-3 gap-8">{favElements}</div>
        </div>
    );
};

export default Favorite;
