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

            auth?.accessToken && auth?.accessToken === false
                ? setIsLoading(false)
                : verifyRefreshToken();
        }

        return () => (effectRan.current = true);
    }, [location.pathname]);

    return <>{isLoading ? "Persist" : <Outlet />}</>;
};

export default PersistLogin;
