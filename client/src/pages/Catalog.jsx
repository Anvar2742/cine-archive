import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetApiData from "../hooks/api/useGetApiData";
import { useEffectOnce } from "../hooks/useEffectOnce";
import SingleTitleCard from "../components/SingleTitleCard";

const Catalog = () => {
    const location = useLocation();
    const [titleArr, setTitleArr] = useState(null);
    const [titleElements, setTitleElements] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPageUpdate, setIsPageUpdate] = useState(false);
    const scrollContainerRef = useRef();

    const getMovies = useGetApiData();

    useEffectOnce(() => {
        getMovies("movie", "now_playing", currentPage).then((data) => {
            // console.log(data);
            setTitleArr(data.results);
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
    };

    const addRemoveWatchlistClient = (titleId) => {
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

    if (!titleElements) return <div>Loading...</div>;

    return (
        <div className="container mx-auto" ref={scrollContainerRef}>
            <h1 className=" text-4xl font-bold my-12">Now playing</h1>
            <div className=" grid grid-cols-3 gap-8">{titleElements}</div>
        </div>
    );
};

export default Catalog;
