import { useEffect, useState } from "react";
import useSearchMovies from "../hooks/api/useSearchMovies";
import { SearchIcon } from "./svgIcons";
import { Link, useLocation } from "react-router-dom";

const SearchModal = () => {
    const [titlesArr, setTitlesArr] = useState([]);
    const [titlesEls, setTitlesEls] = useState(null);
    const location = useLocation();
    const searchMovies = useSearchMovies();

    const handleSearch = (e) => {
        e.preventDefault();
        if (titlesEls) {
            setTitlesEls(null);
            return;
        }
        searchMovies("movie", "iron man").then((data) => {
            setTitlesArr(data?.results);
        });
    };

    useEffect(() => {
        if (titlesArr?.length) {
            setTitlesEls(
                titlesArr.map((el) => {
                    return (
                        <Link
                            to={`/titles/${el?.id}`}
                            key={el?.id}
                            className="flex items-center gap-2 w-full mb-2 pl-4 pr-1"
                        >
                            <img
                                src={el?.backdrop_path}
                                alt=""
                                className="w-1/3 rounded-xl"
                            />
                            <div className="w-2/3">
                                <h4 className="text-sm">{el?.title}</h4>
                            </div>
                        </Link>
                    );
                })
            );
        }
    }, [titlesArr]);

    return (
        <div className="fixed top-0 left-0 bg-primary bg-opacity-50 w-screen h-screen z-50 pt-20 flex items-center justify-start flex-col">
            <div className="bg-blurred backdrop-blur-md rounded-3xl">
                <form
                    className=" max-w-xs flex bg-white overflow-hidden rounded-full pr-1 h-8"
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        className="p-2 text-primary w-full"
                        placeholder="Movie title"
                    />
                    <button
                        type="submit"
                        className=" border-l border-primary h-full px-2 group"
                    >
                        <SearchIcon className="fill-primary w-5 h-5 transition-colors group-hover:fill-sec" />
                    </button>
                </form>
                {titlesEls ? (
                    <div className="pb-4">
                        <div className=" max-w-xs overflow-x-hidden mt-3 max-h-96">
                            {titlesEls}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default SearchModal;
