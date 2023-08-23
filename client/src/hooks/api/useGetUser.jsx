import useAxiosPrivate from "./useAxiosPrivate";

const useGetUser = () => {
    const axiosPrivate = useAxiosPrivate();

    const getUser = async () => {
        try {
            const resp = await axiosPrivate.get("/user", {
                withCredentials: true,
            });

            return resp.data;
        } catch (error) {
            console.log(error);
        }
    };
    return getUser;
};

export default useGetUser;
