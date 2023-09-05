import React, { useRef, useState } from "react";
import SearchForm from "./SearchForm";
import { SearchIcon, XIcon } from "../UI/svgIcons";

const SearchBar = () => {
    const [isSearchForm, setIsSearchForm] = useState(false);
    const openSearchRef = useRef();

    /**
     * Show/hide search form
     */
    const toggleSearchForm = (isOpen) => {
        setIsSearchForm(isOpen);
    };

    return (
        <>
            {isSearchForm ? (
                <div className=" fixed w-full h-full bg-black bg-opacity-40 top-0 left-0 lg:hidden z-10"></div>
            ) : (
                ""
            )}
            <div
                className={`rounded-3xl transition-all duration-500 fixed lg:static left-0 right-0 px-4 lg:px-0 z-20 ${
                    isSearchForm
                        ? "lg:max-w-sm top-20 lg:opacity-100"
                        : "lg:max-w-0 -top-40 lg:opacity-0 overflow-hidden"
                }`}
            >
                <div className={`max-w-xs mx-auto h-8`}>
                    <SearchForm
                        toggleSearchForm={toggleSearchForm}
                        openSearchRef={openSearchRef}
                        isSearchForm={isSearchForm}
                    />
                </div>
            </div>

            <button
                ref={openSearchRef}
                className={`lg:hidden fixed transition-all w-10 h-10 block bg-sec font-semibold rounded-full right-0 left-0 mx-auto hover:rotate-45
                after:block after:w-4 after:h-[2px] after:bg-white after:left-0 after:right-1/2 after:mx-auto after:rotate-45 after:translate-y-[-0.5px]
                before:translate-y-[1px] before:block before:w-4 before:h-[2px] before:bg-white before:left-0 before:right-1/2 before:mx-auto before:-rotate-45 ${
                    isSearchForm ? `bottom-4 z-50` : "-bottom-40"
                }`}
            ></button>

            <button ref={openSearchRef}>
                {isSearchForm ? (
                    <XIcon className="w-5 h-5 fill-white hidden lg:block" />
                ) : (
                    <SearchIcon className="fill-white w-5 h-5" />
                )}
            </button>
        </>
    );
};

export default SearchBar;
