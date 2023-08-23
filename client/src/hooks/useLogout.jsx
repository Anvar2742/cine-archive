import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const resp = await axios.post(
                "/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(resp);
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
