import useAxiosPrivate from "./useAxiosPrivate";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";

const useGetListTitles = () => {
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
            const updatedResults = await updateResults(
                resp.data,
                favIds,
                watchIds,
                size
            );

            // console.log(updatedResults);

            return updatedResults;
        } catch (error) {
            console.log(error);
        }
    };
    return getListTitles;
};

export default useGetListTitles;
