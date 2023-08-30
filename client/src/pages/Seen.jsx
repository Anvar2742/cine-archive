import React, { useEffect, useState } from "react";
import SingleTitleCard from "../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";
import useGetListTitles from "../hooks/api/useGetListTitles";
import Loader from "../components/Loader";

const Seen = () => {
    const [favTitleArr, setFavTitleArr] = useState(null);
    const [favElements, setFavElements] = useState(null);
    const location = useLocation();
    const getListTitles = useGetListTitles();
    const [isLoading, setIsLoading] = useState(true);

    const addRemoveSeensClient = (titleId) => {
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

    const getSeens = async () => {
        try {
            const results = await getListTitles(true, 1280);

            if (results?.length) {
                setFavTitleArr(results);
            } else {
                setFavTitleArr([]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffectOnce(() => {
        getSeens();
    }, [location?.pathname]);

    useEffect(() => {
        // console.log(favTitleArr);
        if (favTitleArr) {
            if (favTitleArr.length) {
                setFavElements(
                    favTitleArr.map((el) => {
                        return (
                            <SingleTitleCard
                                key={el.id}
                                title={el}
                                mediaType={"movie"}
                                addRemoveSeensClient={
                                    addRemoveSeensClient
                                }
                                addRemoveWatchlistClient={
                                    addRemoveWatchlistClient
                                }
                            />
                        );
                    })
                );
            } else {
                setFavElements("No seens");
            }
        }
    }, [favTitleArr]);

    if (isLoading) return <Loader />;
    return (
        <div className="container mx-auto px-4">
            <h1 className=" text-4xl font-bold my-12">My seens</h1>
            <div className=" grid gap-8 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 phone:grid-cols-2">{favElements}</div>
        </div>
    );
};

export default Seen;
