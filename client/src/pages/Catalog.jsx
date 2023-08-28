import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetApiData from "../hooks/api/useGetApiData";
import { useEffectOnce } from "../hooks/useEffectOnce";
import SingleTitleCard from "../components/SingleTitleCard";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const AskLoginModal = ({ handleAskLoginModal }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center">
            <div className=" max-w-xs w-full bg-primary p-6 rounded-xl shadow-header">
                <h3 className=" text-xl font-bold">Log in required</h3>
                <p>Please log in to add movies to your lists.</p>
                <button
                    onClick={handleAskLoginModal}
                    className="font-semibold bg-sec py-1 px-4 mt-4 mx-auto block"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const Catalog = () => {
    const location = useLocation();
    const [titleArr, setTitleArr] = useState(null);
    const [titleElements, setTitleElements] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPageUpdate, setIsPageUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef();
    const { auth } = useAuth();
    const [isAskLogin, setIsAskLogin] = useState(false);

    const getMovies = useGetApiData();

    useEffectOnce(() => {
        getMovies("movie", "now_playing", currentPage)
            .then((data) => {
                // console.log(data);
                setTitleArr(data.results);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [location?.pathname]);

    useEffect(() => {
        if (isPageUpdate) {
            getMovies("movie", "now_playing", currentPage).then((data) => {
                // console.log(data);
                setTitleArr((prevArr) => [...prevArr, ...data.results]);
                setIsPageUpdate(false);
            });
        }
    }, [currentPage]);

    const addRemoveFavoritesClient = (titleId) => {
        if (auth.accessToken) {
            setTitleArr((prevArr) => {
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
        } else {
            setIsAskLogin(true);
        }
    };

    const addRemoveWatchlistClient = (titleId) => {
        if (auth.accessToken) {
            setTitleArr((prevArr) => {
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
        } else {
            setIsAskLogin(true);
        }
    };

    useEffect(() => {
        if (isAskLogin) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [isAskLogin]);

    const handleAskLoginModal = () => {
        setIsAskLogin((prev) => !prev);
    };

    useEffect(() => {
        console.log(titleArr);
        if (titleArr) {
            setTitleElements(() => {
                return titleArr.map((el) => {
                    return (
                        <SingleTitleCard
                            key={el?.id}
                            title={el}
                            mediaType={"movie"}
                            addRemoveFavoritesClient={addRemoveFavoritesClient}
                            addRemoveWatchlistClient={addRemoveWatchlistClient}
                        />
                    );
                });
            });
        }
    }, [titleArr]);

    useEffect(() => {
        const handleScroll = () => {
            const el = scrollContainerRef.current;
            if (el) {
                const atBottom =
                    Math.floor(el.getBoundingClientRect().bottom) <=
                    window.innerHeight + 100;

                if (atBottom) {
                    if (!isPageUpdate) {
                        setCurrentPage((prev) => prev + 1);
                        setIsPageUpdate(true);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location?.pathname, scrollContainerRef, isPageUpdate]);

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto" ref={scrollContainerRef}>
            {isAskLogin ? (
                <AskLoginModal handleAskLoginModal={handleAskLoginModal} />
            ) : (
                ""
            )}
            <h1 className=" text-4xl font-bold my-12">Now playing</h1>
            <div className=" grid grid-cols-3 gap-8">{titleElements}</div>
        </div>
    );
};

export default Catalog;
