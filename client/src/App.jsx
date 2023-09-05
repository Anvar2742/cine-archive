import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Functionality/MainLayout";
import PersistLogin from "./components/Functionality/PersistLogin";
import RequireAuth from "./components/Functionality/RequireAuth";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog";
import Seen from "./pages/Seen";
import Watchlist from "./pages/Watchlist";
import Single from "./pages/Single";
import Auth from "./pages/auth/Auth";
import NotFound from "./components/UI/NotFound";

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover" element={<Catalog />} />
                    <Route path="/titles/:titleId" element={<Single />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/seen" element={<Seen />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                    </Route>
                </Route>
            </Route>
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
