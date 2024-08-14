import {useState} from "react";
import {FiMenu} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {motion} from "framer-motion"
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Avatar, Dropdown} from "flowbite-react";
import {logOut} from "@/redux/slices/userSlice";
import {useDispatch} from "react-redux";
import {FaMoon} from "react-icons/fa6";
import {FaSun} from "react-icons/fa6";
import {changeTheme} from "@/redux/slices/themeSlice";
import {CgProfile} from "react-icons/cg";
import {RiLogoutCircleLine} from "react-icons/ri";
import {logOutClear} from "@/redux/slices/wishlistSlice";
import Typo from "@/Typography";
export default function Header() {
    const [sideBar, setSideBar] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((store: RootState) => store.user)
    const currentTheme = useSelector((store: RootState) => store.theme.themeState)

    return (
        user.currentUser && (location.pathname != "/" && location.pathname != "/login" && location.pathname != "/register") ? (
            <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} className="w-full z-50 lg:py-4 py-2 px-3 md:px-10 dark:bg-gray-950 bg-slate-100">
                <section className="flex justify-between items-center">
                    <Typo variant="p" className="z-10  font-clashSemiBold tracking-wider hidden lg:flex flex-row gap-10 items-center">
                        <Link to="/" className="dark:bg-slate-300  dark:rounded-3xl"><img src="/movie.png" className="h-10" alt="icon" /></Link>
                        <Link to="/home" className={`cursor-pointer ${location.pathname == "/home" ? "text-red-700" : ""} `} >Home</Link>
                        <Link to="/search?searchTerm=" className={`cursor-pointer ${location.pathname == "/search" ? "text-red-700" : ""}`}>Search</Link>
                        <Link to="/wishlist" className={`cursor-pointer ${location.pathname == "/wishlist" ? "text-red-700" : ""}`}>My Wishlists</Link>
                    </Typo>
                    <Typo
                        variant="h6"
                        className="lg:flex flex-row hidden gap-10 items-center"
                    >
                        <button className="transition-all border border-black/15 bg-slate-50 dark:bg-gray-950 dark:border-slate-600 px-3 py-3 rounded-full z-50" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-white" /> : (<FaSun />)}</button>

                        <Dropdown
                            label={
                                <Avatar
                                    alt="Profile"
                                    img={user.currentUser.userPfp}
                                    rounded
                                    bordered
                                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                />
                            }
                            arrowIcon={false}
                            inline
                            className="px-2"
                        >
                            <Dropdown.Item as={Link} to="/profile">
                                <div className="flex gap-3 items-center">
                                    <CgProfile />
                                    <p>Profile </p>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => {dispatch(logOut()); dispatch(logOutClear())}}>
                                <div className="flex gap-3 items-center">
                                    <RiLogoutCircleLine />
                                    <p>Sign out </p>

                                </div>
                            </Dropdown.Item>
                        </Dropdown>
                    </Typo>
                    <span className="z-50 lg:hidden text-2xl flex w-full justify-between flex-row gap-5 items-center">
                        <button onClick={() => setSideBar(!sideBar)} >                        <FiMenu className="text-3xl" />
                        </button>
                        <Typo variant="p" className="flex flex-row gap-6 items-center">
                            <button className="transition-all border border-black/15 bg-slate-50 dark:bg-gray-950 dark:border-slate-600 md:p-3 rounded-full z-50 p-2" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-white" /> : (<FaSun />)}</button>
                            <Dropdown
                                label={
                                    <Avatar
                                        alt="Profile"
                                        img={user.currentUser.userPfp}
                                        rounded
                                        bordered
                                        className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                    />
                                }
                                arrowIcon={false}
                                inline
                                className="px-2"
                            >
                                <Dropdown.Item as={Link} to="/profile">
                                    <div className="flex gap-3 items-center">
                                        <CgProfile />
                                        <p>Profile </p>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => {dispatch(logOut()); dispatch(logOutClear())}}>
                                    <div className="flex gap-3 items-center">
                                        <RiLogoutCircleLine />
                                        <p>Sign out </p>

                                    </div>
                                </Dropdown.Item>
                            </Dropdown>

                        </Typo>
                    </span>
                </section>

                <nav className={`dark:bg-gray-900 fixed inset-0 z-50 bg-slate-50 transition-transform transform duration-300 ${sideBar ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
                    <div className="flex justify-between items-center py-2 px-5 text-black text-xl">
                        <Link to="/" onClick={() => setSideBar(false)}>
                            <img src="/movie.png" alt="icon" className="dark:bg-slate-300 dark:p-1 dark:rounded-3xl h-10" />
                        </Link>
                        <button onClick={() => setSideBar(!sideBar)} className="text-xl ">
                            <AiOutlineClose className="text-black dark:text-slate-200" />
                        </button>
                    </div>
                    <section className="flex flex-col items-center gap-10 mt-36">
                        <Typo variant="h5" className="flex flex-col items-center gap-12 font-clashSemiBold">
                            <Link to="/home" className={`cursor-pointer ${location.pathname == "/home" ? "text-red-700" : ""} `} onClick={() => setSideBar(false)}>Home</Link>
                            <Link to="/search?searchTerm=" className={`cursor-pointer ${location.pathname == "/search" ? "text-red-700" : ""}`} onClick={() => setSideBar(false)}>Search</Link>
                            <Link to="/wishlist" className={`cursor-pointer ${location.pathname == "/wishlist" ? "text-red-700" : ""} `} onClick={() => setSideBar(false)}>My Wishlists</Link>
                            <Link to="/profile" className={`cursor-pointer ${location.pathname == "/profile" ? "text-red-700" : ""} `} onClick={() => setSideBar(false)}>Profile</Link>
                        </Typo>
                    </section>
                </nav>

            </motion.div >

        ) : null
    );
}
