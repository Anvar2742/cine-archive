import { axiosMovies } from "../../api/axios";

const useSearchMovies = () => {
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
            return resp?.data;
        } catch (error) {
            console.log(error);
        }
    };

    return searchMovies;
};

export default useSearchMovies;
