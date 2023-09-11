import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGetCredits from "../../hooks/api/useGetCredits";
import useGetSingle from "../../hooks/api/useGetSingle";
import Loader from "../../components/UI/Loader";
import { PlusIcon, SaveIcon, StarIcon } from "../../components/UI/svgIcons";
import Genres from "./Genres";
import Money from "./Money";
import Cast from "./Cast";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/api/useAxiosPrivate";

const Single = () => {
    const location = useLocation();
    const { titleId } = useParams();
    const [title, setTitle] = useState(null);
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getSingleTitle = useGetSingle();
    const getCredits = useGetCredits();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffectOnce(() => {
        getSingleTitle(titleId)
            .then((data) => {
                console.log(data);
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

    const addToListServer = async (title, isSeen = null, isWatch = null) => {
        try {
            const resp = await axiosPrivate.put(
                "/default_lists",
                {
                    title,
                    isSeen,
                    isWatch,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addToList = (title, isSeen = false) => {
        if (auth?.accessToken) {
            if (isSeen) {
                setTitle((prevTitle) => {
                    return {
                        ...prevTitle,
                        isSeen: !prevTitle.isSeen,
                    };
                });
                addToListServer(title, true, null);
            } else {
                setTitle((prevTitle) => {
                    return {
                        ...prevTitle,
                        isWatch: !prevTitle.isWatch,
                    };
                });
                addToListServer(title, null, true);
            }
        } else {
            // show login required modal
            alert("log in required");
        }
    };

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
                    <div className=" max-w-4xl mx-auto grid md:grid-cols-2 sm:gap-4 relative z-10 bg-primary rounded-3xl overflow-hidden shadow-sm shadow-white">
                        <div>
                            <img src={title?.poster_path} alt="" />
                        </div>
                        <div className="p-6 pt-8 sm:py-10 sm:pr-6">
                            <h1 className=" text-2xl font-bold">
                                {title?.title}
                            </h1>
                            <p className="mt-4 text-sm">{title?.overview}</p>
                            <Genres genres={title?.genres} />
                            {title?.status === "Released" ? (
                                <Money title={title} />
                            ) : (
                                ""
                            )}
                            <div className="flex justify-between mt-4">
                                {title?.vote_count ? (
                                    <div className="">
                                        <h3 className="text-lg">Rating</h3>
                                        <p className="flex items-center">
                                            {title?.vote_average}
                                            <StarIcon />
                                        </p>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div className="flex">
                                    <button
                                        onClick={() => addToList(title, true)}
                                    >
                                        <PlusIcon
                                            isFilled={title?.isSeen}
                                            className="w-8 h-8"
                                            fill="white"
                                        />
                                    </button>
                                    <button onClick={() => addToList(title)}>
                                        <SaveIcon
                                            isFilled={title?.isWatch}
                                            className="w-8 h-8"
                                        />
                                    </button>
                                </div>
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
