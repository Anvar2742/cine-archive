import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosMovies } from "../api/axios";
import { useEffect, useState } from "react";
import { useEffectOnce } from "../hooks/useEffectOnce";
import useUpdateResults from "../hooks/api/useUpdateResults";
import useGetUser from "../hooks/api/useGetUser";
import Loader from "../components/UI/Loader";
import { StarIcon } from "../components/UI/svgIcons";

const Single = () => {
    const location = useLocation();
    const { titleId } = useParams();
    const [title, setTitle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const updateResults = useUpdateResults();
    const getUser = useGetUser();
    const navigate = useNavigate();

    const getSingleTitle = async () => {
        try {
            const resp = await axiosMovies(`movie/${titleId}?language=en-US`, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
            });

            const user = await getUser();
            const updatedResult = await updateResults(
                [resp.data],
                user,
                1280,
                300
            );
            console.log(updatedResult[0]);
            setTitle(updatedResult[0]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 404) {
                navigate("/404", { replace: true });
            }
        }
    };

    useEffectOnce(() => {
        getSingleTitle();
    }, [location?.pathname]);

    const SingleGenres = ({ genres }) => {
        return (
            <div className="mt-4">
                <h3 className=" text-lg">Genres</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {genres.map((genre) => {
                        return (
                            <div
                                key={genre.id}
                                className=" bg-sec py-1 px-3 rounded-full"
                            >
                                {genre.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const Money = ({ title }) => {
        return (
            <div className="flex gap-4 mt-4">
                <div>
                    <h3 className="text-lg">Budget</h3>
                    <p>{title?.budget.toLocaleString()}$</p>
                </div>
                <div>
                    <h3 className="text-lg">Revenue</h3>
                    <p>{title?.revenue.toLocaleString()}$</p>
                </div>
            </div>
        );
    };

    if (isLoading) return <Loader />;

    return (
        <div className=" pt-20x relative">
            <img
                src={title?.backdrop_path}
                alt=""
                className="w-full absolute blur-sm pointer-events-none"
            />
            <p className="py-1 px-4 rounded-lg left-1/2 -translate-x-1/2 absolute top-32 bg-primary">
                {title?.tagline}
            </p>
            <div className="pt-32">
                <div className=" max-w-4xl mx-auto grid grid-cols-2 gap-10 relative z-10 bg-primary rounded-3xl overflow-hidden shadow-sm shadow-white">
                    <div>
                        <img src={title?.poster_path} alt="" />
                    </div>
                    <div className=" py-10 pr-6">
                        <h1 className=" text-2xl font-bold">{title?.title}</h1>
                        <p className="mt-4">{title?.overview}</p>
                        <SingleGenres genres={title?.genres} />
                        <Money title={title} />
                        <div className="mt-4">
                            <h3 className="text-lg">Rating</h3>
                            <p className="flex items-center">
                                {title?.vote_average}
                                <StarIcon />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;
