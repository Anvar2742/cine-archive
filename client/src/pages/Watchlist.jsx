import React, { useEffect, useState } from "react";
import SingleTitleCard from "./../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";
import useGetListTitles from "../hooks/api/useGetListTitles";

const Watchlist = () => {
    const [watchTitleArr, setWatchTitleArr] = useState(null);
    const [watchElements, setWatchElements] = useState(null);
    const location = useLocation();
    const getListTitles = useGetListTitles();

    const addRemoveWatchlistClient = (titleId) => {
        setWatchTitleArr((prevArr) => {
            return prevArr.filter((elMap) => {
                return !(titleId === elMap.id);
            });
        });
    };

    const addRemoveFavoritesClient = (titleId) => {
        setWatchTitleArr((prevArr) => {
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

    const getWatchlist = async () => {
        try {
            const results = await getListTitles(false, 1280);

            if (results?.length) {
                setWatchTitleArr(results);
            } else {
                setWatchTitleArr([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getWatchlist();
    }, [location?.pathname]);

    useEffect(() => {
        console.log(watchTitleArr);
        if (watchTitleArr) {
            if (watchTitleArr.length) {
                setWatchElements(
                    watchTitleArr.map((el) => {
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
                setWatchElements("No watchlist titles");
            }
        }
    }, [watchTitleArr]);

    return (
        <div className="container mx-auto">
            <h1 className=" text-4xl font-bold my-12">My watchlist titles</h1>
            <div className=" grid grid-cols-3 gap-8">{watchElements}</div>
        </div>
    );
};

export default Watchlist;
