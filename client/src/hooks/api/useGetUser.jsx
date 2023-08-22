import useAxiosPrivate from "./useAxiosPrivate";

const useGetUser = () => {
    const authToken = import.meta.env.VITE_TMDB_AUTH_TOKEN;
    const axiosPrivate = useAxiosPrivate();

    const getUser = async () => {
        try {
            const resp = await axiosPrivate.get("/user", {
                headers: {
                    Authorization: "Bearer " + authToken,
                    "Content-Type": "application/json",
                },
            });
            // console.log(resp.data);

            return resp.data;
        } catch (error) {
            console.log(error);
        }
    };
    return getUser;
};

export default useGetUser;
