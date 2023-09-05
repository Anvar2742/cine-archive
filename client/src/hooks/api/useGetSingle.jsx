import { useNavigate } from "react-router-dom";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";
import { axiosMovies } from "../../api/axios";

const useGetSingle = () => {
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const updateResults = useUpdateResults();
    const getUser = useGetUser();
    const navigate = useNavigate();

    const getSingleTitle = async (titleId) => {
        try {
            const resp = await axiosMovies(`movie/${titleId}?language=en-US`, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
            });

            const user = await getUser();
            const updatedResult = await updateResults(
                [resp.data],
                user,
                1280,
                300
            );

            return updatedResult[0];
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 404) {
                navigate("/404", { replace: true });
            }
        }
    };

    return getSingleTitle;
};

export default useGetSingle;
