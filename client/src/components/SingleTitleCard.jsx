import React from "react";
import { Link } from "react-router-dom";

const SingleTitleCard = ({ title, mediaType }) => {
    return (
        <Link
            to={`/title/${mediaType}/${title?.id}`}
            key={title?.id}
            className=""
        >
            <h3>{title?.title}</h3>
            <img src={title?.poster_path} alt={title?.title} />
        </Link>
    );
};

export default SingleTitleCard;
