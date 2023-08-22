import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, SaveIcon, StarIcon } from "./svgIcons";

const SingleTitleCard = ({ title, mediaType }) => {
    // References
    const favRef = useRef(null);
    const saveRef = useRef(null);

    const onClick = (e) => {
        e.preventDefault();

        // Add to favorites
        if (e.target === favRef.current || favRef.current.contains(e.target)) {
            console.log("cool fav");
        }

        // Add to seen
        if (
            e.target === saveRef.current ||
            saveRef.current.contains(e.target)
        ) {
            console.log("cool save");
        }
    };
    return (
        <Link
            to={`/title/${mediaType}/${title?.id}`}
            className=""
            onClick={onClick}
        >
            <img
                src={title?.poster_path}
                alt={title?.title}
                className="rounded-lg"
            />
            <div className="mt-4">
                <h3>{title?.title}</h3>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        {title?.vote_average}
                        <StarIcon />
                    </div>
                    <div className="flex gap-1">
                        <button className="fav_btn" ref={favRef}>
                            <HeartIcon />
                        </button>
                        <button className="save_btn" ref={saveRef}>
                            <SaveIcon isFilled={false} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SingleTitleCard;