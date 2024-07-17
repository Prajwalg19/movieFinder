import {useSelector} from "react-redux"
import {RootState} from "@/redux/store"
import {Navigate} from "react-router-dom";
import {Outlet} from "react-router-dom";

export default function PrivateRoute() {
    const user = useSelector((store: RootState) => store.user.currentUser);
    return (user ? <Outlet /> : <Navigate to="/login" />)
}
