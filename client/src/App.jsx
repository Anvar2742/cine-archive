import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PersistLogin from "./components/PersistLogin";
import Favorite from "./pages/Favorite";
import Watchlist from "./pages/Watchlist";

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover" element={<Catalog />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
