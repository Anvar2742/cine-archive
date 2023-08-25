import axios, { axiosMovies } from "../../api/axios";
import useGetUser from "./useGetUser";

const useGetApiData = (mediaType, listType, page, size = 1280) => {
    const getUser = useGetUser();
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";

    const getFavorites = async (sessionId) => {
        const url = `https://api.themoviedb.org/3/account/16104096/favorite/${mediaType}s?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`;
        const config = {
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
        };

        const resp = await axios.get(url, config);

        return resp.data;
    };

    const getFavIds = (favData) => {
        const results = favData.results;
        const favIds = results.map((el) => el.id);
        return favIds;
    };

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
            const sessionId = await user.session_id;
            const favorites = await getFavorites(sessionId);
            const favIds = getFavIds(favorites);

            const updatedResults = await resp.data.results.map((el) => {
                const userFavId = favIds.filter((elF) => elF === el.id);

                return {
                    ...el,
                    backdrop_path: IMG_BASE_URL + `w${size}` + el.backdrop_path,
                    poster_path: IMG_BASE_URL + `w${size}` + el.poster_path,
                    isFav: userFavId.length ? true : false,
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
