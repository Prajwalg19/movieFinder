import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import LandingPage from "./pages/Landingpage"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import {useSelector} from "react-redux"
import {RootState} from "./redux/store"
function App() {
    const user = useSelector((store: RootState) => store.user)
    return (
        <BrowserRouter>
            {user.currentUser ? <Header /> : null}
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
        </BrowserRouter>
    )
}

export default App
