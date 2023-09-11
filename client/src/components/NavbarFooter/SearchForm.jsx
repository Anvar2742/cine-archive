import { useEffect, useRef, useState } from "react";
import useSearchMovies from "../../hooks/api/useSearchMovies";
import { SearchIcon } from "../UI/svgIcons";
import { Link } from "react-router-dom";

const SearchForm = ({ openSearchRef, toggleSearchForm }) => {
    const [titlesArr, setTitlesArr] = useState([]);
    const [titlesEls, setTitlesEls] = useState(null);
    const [query, setQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const searchMovies = useSearchMovies();
    const formRef = useRef();
    const inputRef = useRef();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!query) {
            setTitlesEls(
                <div className="px-4">
                    <p className="text-lg">Silence isn't for this occasion</p>
                    <p className="text-xs">
                        Type a movie name that you're searching for
                    </p>
                </div>
            );
            setTitlesArr([]);
            return;
        }
        searchMovies("movie", query, 185).then((data) => {
            if (data?.results.length) {
                setTitlesArr(data?.results);
            } else {
                setTitlesArr([]);
                setTitlesEls(<div className="px-4">Nothing for "{query}"</div>);
            }
        });
    };

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (titlesArr?.length) {
            setTitlesEls(
                titlesArr.map((el) => {
                    return (
                        <Link
                            to={`/titles/${el?.id}`}
                            key={el?.id}
                            className="flex items-center gap-2 w-full pl-4 pr-1 py-2 hover:backdrop-blur-md"
                        >
                            <img
                                src={el?.poster_path}
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

    useEffect(() => {
        const handleWindowClick = (e) => {
            if (openSearchRef.current.contains(e.target)) {
                setIsSearch((prev) => !prev);
            } else if (!formRef.current.contains(e.target)) {
                setIsSearch(false);
            }
        };

        document.addEventListener("click", handleWindowClick);

        return () => {
            document.removeEventListener("click", handleWindowClick);
        };
    }, []);

    useEffect(() => {
        toggleSearchForm(isSearch);
        if (isSearch) {
            inputRef.current.focus();
        }
        setQuery("");
        setTitlesArr([]);
        setTitlesEls(null);
    }, [isSearch]);

    return (
        <>
            <form
                className="h-full flex bg-blurred backdrop-blur-md border border-white rounded-full pr-1"
                onSubmit={handleSearch}
                ref={formRef}
            >
                <input
                    type="text"
                    className="p-2 text-white bg-transparent w-full h-full placeholder:text-white placeholder:text-opacity-70"
                    placeholder="Movie title"
                    value={query}
                    onChange={onChange}
                    ref={inputRef}
                />
                <button
                    type="submit"
                    className=" border-l border-white h-full px-2 group"
                >
                    <SearchIcon className="fill-white w-5 h-5 transition-colors group-hover:fill-sec" />
                </button>
            </form>
            {titlesEls ? (
                <div className="pb-4 bg-blurred backdrop-blur-md pt-3 rounded-3xl">
                    <div className=" max-w-xs overflow-x-hidden max-h-96">
                        {titlesEls}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default SearchForm;
