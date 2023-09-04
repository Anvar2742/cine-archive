import { axiosMovies } from "../../api/axios";

const useGetGenres = () => {
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    
    const getGenres = async (mediaType) => {
        let url = `/genre/${mediaType}/list`;
        try {
            const resp = await axiosMovies.get(url, {
                headers: {
                    Authorization: "Bearer " + authToken,
                    "Content-Type": "application/json",
                },
            });

            return resp.data;
        } catch (error) {
            console.log(error);
        }
    };

    return getGenres;
};

export default useGetGenres;
