import React, { useEffect, useState } from "react";
import SingleTitleCard from "./../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";
import useGetListTitles from "../hooks/api/useGetListTitles";
import Loader from "../components/Loader";

const Watchlist = () => {
    const [watchTitleArr, setWatchTitleArr] = useState(null);
    const [watchElements, setWatchElements] = useState(null);
    const location = useLocation();
    const getListTitles = useGetListTitles();
    const [isLoading, setIsLoading] = useState(true);

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
        } finally {
            setIsLoading(false);
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

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto px-4">
            <h1 className=" text-4xl font-bold my-12">My watchlist titles</h1>
            <div className=" grid gap-8 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 phone:grid-cols-2">
                {watchElements}
            </div>
        </div>
    );
};

export default Watchlist;
