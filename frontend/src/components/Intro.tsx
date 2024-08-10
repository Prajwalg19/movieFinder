import {HiArrowLongRight} from "react-icons/hi2";
import {FaLightbulb} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "@/redux/store";
import Typo from "@/Typography";
export default function Intro() {
    const user = useSelector((store: RootState) => store.user.currentUser)
    return (
        <div className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/bg_poster.jpg')"}}>
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl gap-10 mx-auto px-5">
                <div className="flex flex-col">
                    <Typo variant="h1" className="text-white">
                        <span className="text-red-700">Movie </span>Finder
                    </Typo>
                    <Typo variant="p" className="mt-4 text-white">
                        Discover and explore your favorite movies, series, and episodes.
                    </Typo>
                </div>
                <div className="flex flex-col sm:flex-row justify-around w-full gap-7 sm:gap-0 delay-4">
                    <Link to={user ? "/home" : "/login"} className="border py-3 w-full shadow-md sm:w-[220px] box-border whitespace-nowrap px-7 group bg-black rounded-sm text-white flex flex-row justify-center items-center hover:scale-105 transition gap-2 font-clashSemiBold tracking-wider">
                        Get Started
                        <span>
                            <HiArrowLongRight className="text-gray-300 text-2xl group-hover:translate-x-2 transition ease-in-out" />
                        </span>
                    </Link>

                    <a href="#faq" className="border py-3 w-full shadow-md sm:w-[220px] box-border whitespace-nowrap px-7 group bg-red-700 rounded-sm text-white flex flex-row justify-center items-center hover:scale-105 transition gap-2 font-clashSemiBold tracking-wider">
                        <span>Know More</span>
                        <span>
                            <FaLightbulb className="text-gray-300 text-2xl group-hover:translate-x-2 transition ease-in-out" />
                        </span>
                    </a>
                </div>
            </div>

            <div className="absolute bottom-4 flex justify-center w-full animate-bounce">
                <a href="#info" className="text-white dark:text-dark flex flex-col items-center text-center">
                    <IoIosArrowDown className="text-3xl" />
                    <Typo variant="body" className="mt-2 dark:text-dark">Scroll Down</Typo>
                </a>
            </div>
        </div>
    );
}

