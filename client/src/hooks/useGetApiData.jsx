import { axiosMovies } from "../api/axios";

const useGetApiData = (mediaType, listType, page, size = 1280) => {
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
            // console.log(resp.data);
            const updatedResults = await resp.data.results.map((el) => {
                // const isFav = 
                return {
                    ...el,
                    backdrop_path: IMG_BASE_URL + `w${size}` + el.backdrop_path,
                    poster_path: IMG_BASE_URL + `w${size}` + el.poster_path,
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
