import { axiosMovies } from "../../api/axios";

const useGetCredits = () => {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;

    const getMovies = async (mediaType, movieId, size = 1280) => {
        let url = `${mediaType}/${movieId}/credits?language=en-US`;
        try {
            const resp = await axiosMovies.get(url, {
                headers: {
                    Authorization: "Bearer " + authToken,
                    "Content-Type": "application/json",
                },
            });
            const updateProfilePath = (arr) => {
                return arr.map((el) => {
                    const profile_path = el?.profile_path
                        ? IMG_BASE_URL + `w${size}` + el.profile_path
                        : "https://placehold.co/1280x1920?text=No%20image";

                    return {
                        ...el,
                        profile_path,
                    };
                });
            };

            const cast = updateProfilePath(resp.data.cast);
            const crew = updateProfilePath(resp.data.crew);

            const credits = { cast, crew, id: resp.data.id };

            return credits;
        } catch (error) {
            console.log(error);
        }
    };
    return getMovies;
};

export default useGetCredits;
