import {HiArrowLongRight} from "react-icons/hi2";
import {FaLightbulb} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "@/redux/store";
export default function Intro() {
    const user = useSelector((store: RootState) => store.user.currentUser)
    return (
        <div className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/bg_poster.jpg')"}}>
            <div className="absolute inset-0 font-clashRegular"></div>
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl gap-10 mx-auto px-5">
                <div className="flex flex-col">
                    <h1 className="text-5xl sm:text-6xl text-white font-clashBold">
                        <span className="text-red-700">Movie </span>Finder
                    </h1>
                    <p className="mt-4 text-white  font-clashRegular text-lg sm:text-xl delay-2">
                        Discover and explore your favorite movies, series, and episodes.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-around w-full gap-7 sm:gap-0 delay-4">
                    <Link to={user ? "/home" : "/login"} className="border py-3 w-full shadow-md sm:w-[220px] box-border whitespace-nowrap px-7 group bg-black rounded-sm text-white flex flex-row justify-center items-center hover:scale-105 transition gap-2 font-clashSemiBold tracking-wider">
                        Get Started
                        <span>
                            <HiArrowLongRight className="text-gray-300 text-2xl group-hover:translate-x-2 transition ease-in-out" />
                        </span>
                    </Link>

                    <Link to="#faq" type="button" className="border py-3 w-full shadow-md sm:w-[220px] box-border whitespace-nowrap px-7 group bg-red-700 rounded-sm text-white flex flex-row justify-center items-center hover:scale-105 transition gap-2 font-clashSemiBold tracking-wider">
                        <span>Know More</span>
                        <span>
                            <FaLightbulb className="text-gray-300 text-2xl group-hover:translate-x-2 transition ease-in-out" />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-4 flex justify-center w-full animate-bounce">
                <a href="#info" className="text-white dark:text-dark flex flex-col items-center text-center">
                    <IoIosArrowDown className="text-3xl" />
                    <p className="text-sm mt-2 font-clashRegular dark:text-dark font-semibold">Scroll Down</p>
                </a>
            </div>
        </div>
    );
}

