import {useState} from "react";
import {FiMenu} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {motion} from "framer-motion"
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
export default function Header() {
    const [sideBar, setSideBar] = useState(false);
    const location = useLocation();
    const user = useSelector((store: RootState) => store.user)
    return (
        user.currentUser && (location.pathname != "/" && location.pathname != "/login" && location.pathname != "/register") ? (
            <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} className="w-full z-50 lg:pt-4 pt-2 pb-2 px-10 dark:bg-black bg-slate-100">
                <section className="flex justify-between items-center">
                    <ul className="z-10  font-clashRegular tracking-wider hidden lg:flex flex-row gap-10 items-center font-semibold">
                        <li className="dark:bg-slate-300 dark:p-1 dark:rounded-3xl"><img src="/movie.png" className="h-10" alt="icon" /></li>
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">My Wishlists</li>
                    </ul>
                    <section className="lg:flex flex-row hidden gap-10 items-center ">
                        <button className="font-clashSemiBold hidden lg:block py-3 px-11 bg-black rounded-sm text-white hover:scale-105 active:scale-100 transition border dark:border-gray-300/40">Download</button>

                    </section>
                    <button onClick={() => setSideBar(!sideBar)} className="z-50 lg:hidden text-2xl flex w-full justify-between flex-row gap-5 items-center">
                        <FiMenu className="text-3xl" />
                        <img src="/movie.png" alt="icon" className="dark:bg-slate-300 dark:p-1 dark:rounded-3xl h-10" />
                    </button>
                </section>

                <nav className={`dark:bg-gray-900 fixed inset-0 z-50 bg-slate-50 transition-transform transform duration-200 ${sideBar ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
                    <div className="flex justify-between items-center py-2 px-5 text-black text-xl">
                        <img src="/movie.png" alt="icon" className="dark:bg-slate-300 dark:p-1 dark:rounded-3xl h-10" />
                        <button onClick={() => setSideBar(!sideBar)} className="text-xl ">
                            <AiOutlineClose className="text-black dark:text-slate-200" />
                        </button>
                    </div>
                    <section className="flex flex-col items-center gap-10 mt-36">
                        <ul className="flex flex-col items-center gap-12 font-clashSemiBold text-2xl">
                            <li className="cursor-pointer" onClick={() => setSideBar(false)}>Home</li>
                            <li className="cursor-pointer" onClick={() => setSideBar(false)}>My Wishlists</li>
                        </ul>
                        <button onClick={() => setSideBar(false)} className="py-3 px-11 bg-black rounded-sm text-white hover:scale-105 active:scale-100 transition border dark:border-gray-300/40 font-clashSemiBold">
                            Download
                        </button>
                    </section>
                </nav>

            </motion.div >

        ) : null
    );
}
