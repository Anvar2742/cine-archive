import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, SaveIcon, StarIcon } from "./svgIcons";

const SingleTitleCard = ({ title, mediaType }) => {
    return (
        <Link to={`/title/${mediaType}/${title?.id}`} className="">
            <img src={title?.poster_path} alt={title?.title}  className="rounded-lg"/>
            <div className="mt-4">
                <h3>{title?.title}</h3>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        {title?.vote_average}
                        <StarIcon />
                    </div>
                    <div className="flex gap-1">
                        <button className="fav_btn">
                            <HeartIcon />
                        </button>
                        <button className="save_btn">
                            <SaveIcon isFilled={false} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SingleTitleCard;
