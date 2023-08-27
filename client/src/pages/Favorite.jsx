import React, { useEffect, useState } from "react";
import SingleTitleCard from "./../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";
import useGetListTitles from "../hooks/api/useGetListTitles";

const Favorite = () => {
    const [favTitleArr, setFavTitleArr] = useState(null);
    const [favElements, setFavElements] = useState(null);
    const location = useLocation();
    const getListTitles = useGetListTitles();

    const addRemoveFavoritesClient = (titleId) => {
        setFavTitleArr((prevArr) => {
            return prevArr.filter((elMap) => {
                return !(titleId === elMap.id);
            });
        });
    };

    const addRemoveWatchlistClient = (titleId) => {
        setFavTitleArr((prevArr) => {
            return prevArr.map((elMap) => {
                if (titleId === elMap.id) {
                    return {
                        ...elMap,
                        isWatch: !elMap.isWatch,
                    };
                } else {
                    return elMap;
                }
            });
        });
    };

    const getFavorites = async () => {
        try {
            const results = await getListTitles(true, 1280);

            if (results?.length) {
                setFavTitleArr(results);
            } else {
                setFavTitleArr([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getFavorites();
    }, [location?.pathname]);

    useEffect(() => {
        console.log(favTitleArr);
        if (favTitleArr) {
            if (favTitleArr.length) {
                setFavElements(
                    favTitleArr.map((el) => {
                        return (
                            <SingleTitleCard
                                key={el.id}
                                title={el}
                                mediaType={"movie"}
                                addRemoveFavoritesClient={
                                    addRemoveFavoritesClient
                                }
                                addRemoveWatchlistClient={
                                    addRemoveWatchlistClient
                                }
                            />
                        );
                    })
                );
            } else {
                setFavElements("No favorites");
            }
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
