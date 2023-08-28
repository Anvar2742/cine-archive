import axios, { axiosMovies } from "../../api/axios";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";

const useGetApiData = () => {
    const getUser = useGetUser();
    const updateResults = useUpdateResults();
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;

    const getMovies = async (mediaType, listType, page, size = 1280) => {
        let url = `${mediaType}/${listType}?language=en-US&page=${page}`;
        try {
            const resp = await axiosMovies.get(url, {
                headers: {
                    Authorization: "Bearer " + authToken,
                    "Content-Type": "application/json",
                },
            });
            const user = await getUser();

            resp.data.results = await updateResults(
                resp.data.results,
                user,
                size
            );

            return resp.data;
        } catch (error) {
            console.log(error);
        }
    };
    return getMovies;
};

export default useGetApiData;
