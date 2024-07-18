import {Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {FaMoon} from "react-icons/fa6";
import {FaSun} from "react-icons/fa6";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {IoPersonSharp} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {changeTheme} from "@/redux/slices/themeSlice";
import {logOut} from "@/redux/slices/userSlice"
import {useNavigate} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTheme = useSelector((store: RootState) => store.theme.themeState)
    const {currentUser} = useSelector((store: RootState) => store.user)
    return (
        <Navbar className="bg-slate-100 w-full max-w-7xl mx-auto dark:bg-gray-950">
            <Navbar.Brand as={Link} to="/" className="text-xl font-bold flex flex-row items-center gap-4">
                <img src="/movie.png" alt="Icon" className="w-auto h-12" />
                <span className="flex flex-col items-start justify-center">
                    <span className="text-sm md:text-md text-wrap flex items-center gap-1 font-clashSemiBold"> <p className="text-red-600">Movie</p>Finder</span>
                </span>

            </Navbar.Brand>

            <div className="md:order-2 flex flex-row items-center gap-10 text-center">
                <button className=" border border-black/10 bg-slate-50 dark:bg-gray-950 dark:border-slate-600 md:px-6 px-4 py-3 rounded-full" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-white" /> : (<FaSun />)}</button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} className="dark:bg-gray-950 dark:white " inline label={ // inline to make the image as the source for Dropdown
                        <Avatar img={currentUser.userPfp} rounded bordered />
                    }>
                        <Dropdown.Item className="text-xs border-gray-700/60 dark:border" icon={IoPersonSharp} as={Link} to="/profile">{currentUser.userName}</Dropdown.Item>
                        <Dropdown.Divider />

                        <Dropdown.Item className="text-xs border-gray-700/60 dark:border" onClick={() => {dispatch(logOut()); navigate("/login")}}>Sign out</Dropdown.Item>

                    </Dropdown>

                ) : (
                    <Link to="/login">
                        <Button outline className="h-10" gradientDuoTone="pinkToOrange">
                            Log In
                        </Button>
                    </Link>

                )
                }

                <Navbar.Toggle />
            </div>


            <Navbar.Collapse className="text-center font-medium">
                <Navbar.Link active={location.pathname == "/" ? true : false} as={Link} to="/">Home</Navbar.Link>
                <Navbar.Link active={location.pathname == "/blogs" ? true : false} as={Link} to="/blogs">My wishlists</Navbar.Link>
                {
                    currentUser ? (
                        <>
                            <Navbar.Link active={location.pathname == "/myblogs"} as={Link} to="/k"></Navbar.Link>
                        </>

                    ) : null
                }
            </Navbar.Collapse>


        </Navbar >
    )
}

export default Header;

