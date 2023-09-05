import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, SaveIcon, StarIcon } from "./svgIcons";
import useAxiosPrivate from "../../hooks/api/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const SingleTitleCard = ({
    title,
    mediaType,
    addRemoveSeensClient,
    addRemoveWatchlistClient,
}) => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    // References
    const favRef = useRef(null);
    const saveRef = useRef(null);

    const onClick = (e) => {
        const addToList = async (isSeen = null, isWatch = null) => {
            try {
                const resp = await axiosPrivate.put(
                    "/default_lists",
                    {
                        title,
                        isSeen,
                        isWatch,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                // console.log(resp.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Add to seens
        if (e.target === favRef.current || favRef.current.contains(e.target)) {
            e.preventDefault();

            addRemoveSeensClient(title?.id);
            if (auth?.accessToken) {
                addToList(true, null);
            }
        }

        // Add to watchlist
        if (
            e.target === saveRef.current ||
            saveRef.current.contains(e.target)
        ) {
            e.preventDefault();

            addRemoveWatchlistClient(title?.id);
            if (auth?.accessToken) {
                addToList(null, true);
            }
        }
    };
    return (
        <Link to={`/titles/${title?.id}`} className="" onClick={onClick}>
            <img
                src={title?.poster_path}
                alt={title?.title}
                className="rounded-lg"
            />
            <div className="mt-4 px-2">
                <h3 className=" md:text-xl phone:text-lg sm:text-3xl sm:font-bold mb-4 overflow-hidden text-ellipsis whitespace-nowrap">{title?.title}</h3>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1 sm:text-2xl text-xl">
                        {title?.vote_average}
                        <StarIcon />
                    </div>
                    <div className="flex sm:gap-1 gap-2">
                        <button className="fav_btn" ref={favRef}>
                            <PlusIcon
                                isFilled={title?.isSeen}
                                size={30}
                                fill="white"
                            />
                        </button>
                        <button className="save_btn" ref={saveRef}>
                            <SaveIcon isFilled={title?.isWatch} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SingleTitleCard;
