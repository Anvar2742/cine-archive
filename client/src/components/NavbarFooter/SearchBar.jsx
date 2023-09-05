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
        <div className="flex gap-2">
            <div
                className={`rounded-3xl transition-all duration-500 ${
                    isSearchForm
                        ? "max-w-sm opacity-100"
                        : "max-w-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className={`max-w-xs flex flex-col h-8`}>
                    <SearchForm
                        toggleSearchForm={toggleSearchForm}
                        openSearchRef={openSearchRef}
                        isSearchForm={isSearchForm}
                    />
                </div>
            </div>

            <button ref={openSearchRef}>
                {isSearchForm ? (
                    <XIcon className="w-5 h-5 fill-white" />
                ) : (
                    <SearchIcon className="fill-white w-5 h-5" />
                )}
            </button>
        </div>
    );
};

export default SearchBar;
