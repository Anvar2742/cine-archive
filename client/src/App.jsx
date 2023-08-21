import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PersistLogin from "./components/PersistLogin";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover" element={<Catalog />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
