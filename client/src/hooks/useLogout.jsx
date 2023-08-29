import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            const resp = await axios.post(
                "/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            // console.log(resp);
            if (resp.status === 204) {
                window.location.reload();
                setAuth({});
            }
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
