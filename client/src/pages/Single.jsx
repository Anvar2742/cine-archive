import { useLocation, useParams } from "react-router-dom";
import { axiosMovies } from "../api/axios";
import { useEffect, useState } from "react";
import { useEffectOnce } from "../hooks/useEffectOnce";

const Single = () => {
    const location = useLocation();
    const { titleId } = useParams();
    const [title, setTitle] = useState(null);
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const getSingleTitle = async () => {
        try {
            const resp = await axiosMovies(`movie/${titleId}?language=en-US`, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
            });
            console.log(resp.data);
            setTitle(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffectOnce(() => {
        getSingleTitle();
    }, [location?.pathname]);

    return (
        <div>
            <h2>{title?.title}</h2>
            <p>{title?.tagline}</p>
        </div>
    );
};

export default Single;
