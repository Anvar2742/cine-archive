import { axiosMovies } from "../../api/axios";
import useAuth from "../useAuth";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";

const useSearchMovies = () => {
    const { auth } = useAuth();
    const getUser = useGetUser();
    const updateResults = useUpdateResults();
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const searchMovies = async (mediaType, query, size = 1280) => {
        const url = `/search/${mediaType}?query=${query}`;
        const options = {
            headers: {
                Authorization: "Bearer " + authToken,
                "Content-Type": "application/json",
            },
        };

        try {
            const resp = await axiosMovies(url, options);

            let user = null;
            if (auth?.accessToken !== false) {
                user = await getUser();
            }

            resp.data.results = await updateResults(
                resp.data.results,
                user,
                size
            );

            return resp?.data;
        } catch (error) {
            console.log(error);
        }
    };

    return searchMovies;
};

export default useSearchMovies;
