import { axiosMovies } from "../../api/axios";
import useAuth from "../useAuth";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";

const useGetUpcoming = () => {
    const { auth } = useAuth();
    const getUser = useGetUser();
    const updateResults = useUpdateResults();
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;

    const getUpcoming = async (
        mediaType,
        page,
        size = 1280,
        backSize = null
    ) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        // Calculate the date 10 days from now
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 10);
        const filterDate =
            futureDate.getFullYear() +
            "-" +
            ("0" + futureDate.getMonth()).slice(-2) +
            "-" +
            ("0" + (futureDate.getDay() + 1)).slice(-2);
            
        // const weekForwardDate = dat
        let url = `discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&region=US&primary_release_year=${currentYear}&primary_release_date.gte=${filterDate}&sort_by=primary_release_date.asc`;
        try {
            const resp = await axiosMovies.get(url, {
                headers: {
                    Authorization: "Bearer " + authToken,
                    "Content-Type": "application/json",
                },
            });

            let user = null;
            if (auth?.accessToken !== false) {
                user = await getUser();
            }

            resp.data.results = await updateResults(
                resp.data.results,
                user,
                size,
                backSize
            );

            return resp.data;
        } catch (error) {
            console.log(error);
        }
    };
    return getUpcoming;
};

export default useGetUpcoming;
