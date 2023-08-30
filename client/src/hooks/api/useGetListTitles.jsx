import useAxiosPrivate from "./useAxiosPrivate";
import useGetUser from "./useGetUser";
import useUpdateResults from "./useUpdateResults";

const useGetListTitles = () => {
    const axiosPrivate = useAxiosPrivate();
    const getUser = useGetUser();
    const updateResults = useUpdateResults();

    const getListTitles = async (isSeenPage, size = 1280) => {
        try {
            const resp = await axiosPrivate.post(
                "/default_lists",
                { isSeenPage },
                {
                    withCredentials: true,
                }
            );
            const user = await getUser();
            if (!user) return console.log("User not found");

            const updatedResults = await updateResults(resp.data, user, size);

            // console.log(updatedResults);

            return updatedResults;
        } catch (error) {
            console.log(error);
        }
    };
    return getListTitles;
};

export default useGetListTitles;
