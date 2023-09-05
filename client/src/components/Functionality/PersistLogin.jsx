import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import Loader from "../UI/Loader";

const PersistLogin = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        auth?.accessToken && auth?.accessToken === false
            ? setIsLoading(false)
            : verifyRefreshToken();
    }, [location.pathname]);

    return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
