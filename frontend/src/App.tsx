import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import Landing from "./pages/Landing"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import Footer from "@/components/Footer"
import PageNotFound from "./pages/PageNotFound"
import {Toaster} from "react-hot-toast"
import MoviePage from "./pages/MoviePage"
import Search from "./pages/Search"
import Profile from "./pages/Profile"

function App() {
    return (
        <BrowserRouter>
            <Header />
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
                <Route path="/profile" element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/search" element={<PrivateRoute />}>
                    <Route path="/search/" element={<Search />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />

            </Routes>
            <Footer />
            <Toaster position="bottom-center" />
        </BrowserRouter>
    )
}

export default App
