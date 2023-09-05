import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGetCredits from "../../hooks/api/useGetCredits";
import useGetSingle from "../../hooks/api/useGetSingle";
import Loader from "../../components/UI/Loader";
import { StarIcon } from "../../components/UI/svgIcons";
import Genres from "./Genres";
import Money from "./Money";
import Cast from "./Cast";

const Single = () => {
    const location = useLocation();
    const { titleId } = useParams();
    const [title, setTitle] = useState(null);
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getSingleTitle = useGetSingle();
    const getCredits = useGetCredits();

    useEffectOnce(() => {
        getSingleTitle(titleId)
            .then((data) => {
                setTitle(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
        getCredits("movie", titleId).then((data) => {
            console.log(data);
            setCast(data?.cast);
        });
    }, [location?.pathname]);

    if (isLoading) return <Loader />;

    return (
        <div className=" pt-20x relative">
            <img
                src={title?.backdrop_path}
                alt=""
                className="w-full absolute blur-sm pointer-events-none"
            />
            <div className="container mx-auto px-4">
                <p className="py-1 px-4 rounded-lg left-1/2 -translate-x-1/2 absolute top-32 bg-primary">
                    {title?.tagline}
                </p>
                <div className="pt-32 mb-24">
                    <div className=" max-w-4xl mx-auto grid grid-cols-2 gap-10 relative z-10 bg-primary rounded-3xl overflow-hidden shadow-sm shadow-white">
                        <div>
                            <img src={title?.poster_path} alt="" />
                        </div>
                        <div className=" py-10 pr-6">
                            <h1 className=" text-2xl font-bold">
                                {title?.title}
                            </h1>
                            <p className="mt-4">{title?.overview}</p>
                            <Genres genres={title?.genres} />
                            {title?.status === "Released" ? (
                                <Money title={title} />
                            ) : (
                                ""
                            )}
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
                <Cast cast={cast} />
            </div>
        </div>
    );
};

export default Single;
