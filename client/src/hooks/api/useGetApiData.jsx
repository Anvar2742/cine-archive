import { axiosMovies } from "../../api/axios";
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
            const favoriteTitleIds = user.favoriteTitleIds;
            // console.log(resp.data);
            const updatedResults = await resp.data.results.map((el) => {
                const userFavId = favoriteTitleIds.filter((elF) => elF === el.id);

                return {
                    ...el,
                    backdrop_path: IMG_BASE_URL + `w${size}` + el.backdrop_path,
                    poster_path: IMG_BASE_URL + `w${size}` + el.poster_path,
                    isFav: userFavId.length ? true : false,
                };
            });

            return updatedResults;
        } catch (error) {
            console.log(error);
        }
    };
    return getMovies;
};

export default useGetApiData;
