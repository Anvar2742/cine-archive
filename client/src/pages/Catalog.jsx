import { useEffect, useRef, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import useGetApiData from "../hooks/api/useGetApiData";
import { useEffectOnce } from "../hooks/useEffectOnce";
import SingleTitleCard from "../components/SingleTitleCard";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const Catalog = () => {
    const location = useLocation();
    const [titleArr, setTitleArr] = useState(null);
    const [titleElements, setTitleElements] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPageUpdate, setIsPageUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef();
    const { auth } = useAuth();
    const { handleAskLoginModal } = useOutletContext();

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

    const addRemoveSeensClient = (titleId) => {
        if (auth?.accessToken && auth?.accessToken !== false) {
            setTitleArr((prevArr) => {
                return prevArr.map((elMap) => {
                    if (titleId === elMap.id) {
                        return {
                            ...elMap,
                            isSeen: !elMap.isSeen,
                        };
                    } else {
                        return elMap;
                    }
                });
            });
        } else {
            handleAskLoginModal();
        }
    };

    const addRemoveWatchlistClient = (titleId) => {
        if (auth?.accessToken && auth?.accessToken !== false) {
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
            handleAskLoginModal();
        }
    };

    useEffect(() => {
        // console.log(titleArr);
        if (titleArr) {
            setTitleElements(() => {
                return titleArr.map((el) => {
                    return (
                        <SingleTitleCard
                            key={el?.id}
                            title={el}
                            mediaType={"movie"}
                            addRemoveSeensClient={addRemoveSeensClient}
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
        <div className="container mx-auto px-4" ref={scrollContainerRef}>
            <h1 className=" text-4xl font-bold my-12">Now playing</h1>
            <div className=" grid gap-8 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 phone:grid-cols-2">
                {titleElements}
            </div>
        </div>
    );
};

export default Catalog;
