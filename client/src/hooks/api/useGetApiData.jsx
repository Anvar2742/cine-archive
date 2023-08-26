import axios, { axiosMovies } from "../../api/axios";
import useGetUser from "./useGetUser";

const useGetApiData = (mediaType, listType, page, size = 1280) => {
    const getUser = useGetUser();
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";

    const getMovies = async () => {
        try {
            const resp = await axiosMovies.get(
                `${mediaType}/${listType}?language=en-US&page=${page}`,
                {
                    headers: {
                        Authorization: "Bearer " + authToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            const user = await getUser();
            if (!user) return console.log("User not found");
            const favIds = user.favIds;
            const watchIds = user.watchIds;

            const updatedResults = await resp.data.results.map((el) => {
                const isTitleFav = favIds.includes(el.id);
                const isTitleWatch = watchIds.includes(el.id);

                return {
                    ...el,
                    backdrop_path: IMG_BASE_URL + `w${size}` + el.backdrop_path,
                    poster_path: IMG_BASE_URL + `w${size}` + el.poster_path,
                    isFav: isTitleFav,
                    isWatch: isTitleWatch,
                };
            });
            console.log(resp.data);

            return updatedResults;
        } catch (error) {
            console.log(error);
        }
    };
    return getMovies;
};

export default useGetApiData;
