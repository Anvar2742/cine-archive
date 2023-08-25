import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, SaveIcon, StarIcon } from "./svgIcons";
import useAxiosPrivate from "../hooks/api/useAxiosPrivate";

const SingleTitleCard = ({
    title,
    mediaType,
    addRemoveFavoritesClient,
    addRemoveWatchlistClient,
}) => {
    const axiosPrivate = useAxiosPrivate();
    // References
    const favRef = useRef(null);
    const saveRef = useRef(null);

    const onClick = (e) => {
        // Add to favorites
        if (e.target === favRef.current || favRef.current.contains(e.target)) {
            e.preventDefault();
            const addRemoveFavoritesServer = async () => {
                const titleId = title?.id;
                const isFav = title?.isFav;
                try {
                    const resp = await axiosPrivate.put("/favorite", {
                        titleId,
                        isFav,
                    });
                    console.log(resp.data);
                } catch (error) {
                    console.log(error);
                }
            };

            addRemoveFavoritesClient(title?.id);
            addRemoveFavoritesServer();
        }

        // Add to seen
        if (
            e.target === saveRef.current ||
            saveRef.current.contains(e.target)
        ) {
            e.preventDefault();

            const addRemoveWatchlistServer = async () => {
                try {
                    const resp = await axiosPrivate.put("/watchlist", {
                        title,
                    });
                    console.log(resp.data);
                } catch (error) {
                    console.log(error);
                }
            };

            addRemoveWatchlistClient(title?.id);
            addRemoveWatchlistServer();
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
                            <HeartIcon isFilled={title?.isFav} />
                        </button>
                        <button className="save_btn" ref={saveRef}>
                            <SaveIcon isFilled={title?.isSaved} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SingleTitleCard;
