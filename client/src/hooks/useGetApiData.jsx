import { axiosMovies } from "../api/axios";

const useGetApiData = (dataType, listType, page) => {
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const getMovies = async () => {
        try {
            const resp = await axiosMovies(
                `${dataType}/${listType}?language=en-US&page=${page}`,
                {
                    headers: {
                        Authorization: "Bearer " + authToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    };
    return getMovies;
};

export default useGetApiData;
