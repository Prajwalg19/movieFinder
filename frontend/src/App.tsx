import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import Landing from "./pages/Landing"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "./redux/store"
import {FaMoon} from "react-icons/fa6";
import {FaSun} from "react-icons/fa6";
import {changeTheme} from "@/redux/slices/themeSlice";
import Footer from "@/components/Footer"
import PageNotFound from "./pages/PageNotFound"
import {Toaster} from "react-hot-toast"
import MoviePage from "./pages/MoviePage"

function App() {
    const dispatch = useDispatch();
    const currentTheme = useSelector((store: RootState) => store.theme.themeState)
    return (
        <BrowserRouter>
            <Header />
            <button className="transition-all border border-black/10 bg-slate-50 dark:bg-gray-950 dark:border-slate-600 opacity-90 px-3 py-3 rounded-full fixed sm:bottom-10 z-50 sm:right-10 bottom-5 right-5" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-white" /> : (<FaSun />)}</button>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="/wishlist" element={<PrivateRoute />}>
                    <Route path="/wishlist" element={<Wishlist />} />
                </Route>
                <Route path="/movie/:id" element={<PrivateRoute />} >
                    <Route path="/movie/:id" element={<MoviePage />} />

                </Route>
                <Route path="*" element={<PageNotFound />} />

            </Routes>
            <Footer />
            <Toaster position="bottom-center" />
        </BrowserRouter>
    )
}

export default App
