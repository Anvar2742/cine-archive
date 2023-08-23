import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/api/useAxiosPrivate";
import SingleTitleCard from "./../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";

const Watchlist = () => {
    const [watchTitleArr, setWatchTitleArr] = useState([]);
    const [watchElements, setWatchElements] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();

    const addRemoveWatchlistClient = (titleId) => {
        setWatchTitleArr((prevArr) => {
            return prevArr.filter((elMap) => {
                return !(titleId === elMap.id);
            });
        });
    };

    const getWatchlists = async () => {
        try {
            const resp = await axiosPrivate.get("/user");
            const watchlistTitles = await resp?.data?.watchlistTitles;
            setWatchTitleArr(watchlistTitles);
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getWatchlists();
    }, [location?.pathname]);

    useEffect(() => {
        if (watchTitleArr?.length) {
            setWatchElements(
                watchTitleArr.map((el) => {
                    return (
                        <SingleTitleCard
                            key={el.id}
                            title={el}
                            mediaType={"movie"}
                            addRemoveWatchlistClient={addRemoveWatchlistClient}
                        />
                    );
                })
            );
        } else {
            setWatchElements("No titles");
        }
    }, [watchTitleArr]);

    return (
        <div className="container mx-auto">
            <h1 className=" text-4xl font-bold my-12">My watchlist</h1>
            <div className=" grid grid-cols-3 gap-8">{watchElements}</div>
        </div>
    );
};

export default Watchlist;
