import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const PersistLogin = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current) {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            !auth?.accessToken && auth?.accessToken !== false
                ? verifyRefreshToken()
                : setIsLoading(false);
        }

        return () => (effectRan.current = true);
    }, [location.pathname]);

    return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
