import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/api/useAxiosPrivate";
import SingleTitleCard from "./../components/SingleTitleCard";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useLocation } from "react-router-dom";

const Favorite = () => {
    const [favTitleArr, setFavTitleArr] = useState([]);
    const [favElements, setFavElements] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();

    const getFavorite = async () => {
        try {
            const resp = await axiosPrivate.get("/favorites");
            const results = await resp?.data?.results;
            setFavTitleArr(results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getFavorite();
    }, [location?.pathname]);

    useEffect(() => {
        if (favTitleArr) {
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
