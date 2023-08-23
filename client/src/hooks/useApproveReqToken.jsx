import axios from "../api/axios";
import useGetUser from "./api/useGetUser";
import { useNavigate } from "react-router-dom";

const useApproveReqToken = () => {
    const getUser = useGetUser();
    const urlParams = new URLSearchParams(window.location.search);
    const reqTokenFromQuery = urlParams.get("request_token");
    const isTokenApproved = urlParams.get("approved");
    const navigate = useNavigate();

    const approveReqToken = async () => {
        try {
            const user = await getUser();
            console.log(user);
            const userReqToken = user?.requestTokenObj?.request_token;
            if (
                userReqToken === reqTokenFromQuery &&
                isTokenApproved === "true"
            ) {
                const response = await axios.put(
                    "/user/request_token",
                    { reqTokenFromQuery },
                    {
                        withCredentials: true,
                    }
                );
                console.log(response.data);
                return navigate("/", { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return approveReqToken;
};

export default useApproveReqToken;
