import useAxiosPrivate from "./useAxiosPrivate";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";

const useGetApiData = () => {
    const axiosPrivate = useAxiosPrivate();
    const getUser = useGetUser();
    const updateResults = useUpdateResults();

    const getListTitles = async (size = 1280) => {
        try {
            const resp = await axiosPrivate.get("/default_lists", {
                withCredentials: true,
            });
            const user = await getUser();
            if (!user) return console.log("User not found");

            const favIds = user.favIds;
            const watchIds = user.watchIds;
            const updatedResults = updateResults(
                resp.data.results,
                favIds,
                watchIds,
                size
            );

            console.log(resp.data);

            return updatedResults;
        } catch (error) {
            console.log(error);
        }
    };
    return getListTitles;
};

export default useGetApiData;
