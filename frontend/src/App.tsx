import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import LandingPage from "./pages/Landingpage"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "./redux/store"
import {FaMoon} from "react-icons/fa6";
import {FaSun} from "react-icons/fa6";
import {changeTheme} from "@/redux/slices/themeSlice";
import Footer from "@/components/Footer"

function App() {
    const dispatch = useDispatch();
    const currentTheme = useSelector((store: RootState) => store.theme.themeState)
    return (
        <BrowserRouter>
            <Header />
            <button className="transition-all border border-black/10 bg-slate-50 dark:bg-gray-950 dark:border-slate-600 opacity-90 px-3 py-3 rounded-full fixed bottom-10 z-50 right-10" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-black" /> : (<FaSun />)}</button>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/landing" element={<PrivateRoute />}>
                    <Route path="/landing" element={<LandingPage />} />
                </Route>
                <Route path="/wishlist" element={<PrivateRoute />}>
                    <Route path="/wishlist" element={<Wishlist />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
