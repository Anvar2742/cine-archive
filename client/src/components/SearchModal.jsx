import { SearchIcon } from "./svgIcons";

const SearchModal = () => {
    return (
        <div className="fixed top-0 left-0 bg-primary bg-opacity-50 w-screen h-screen z-50 pt-20 flex items-start justify-center">
            <form className=" max-w-xs flex bg-white overflow-hidden rounded-full pr-1 h-8">
                <input type="text" className="p-2 text-primary" placeholder="Movie title"/>
                <button type="submit" className=" border-l border-primary h-full px-2 group">
                    <SearchIcon className="fill-primary w-5 h-5 transition-colors group-hover:fill-sec" />
                </button>
            </form>
            <div className="">

            </div>
        </div>
    );
};

export default SearchModal;
