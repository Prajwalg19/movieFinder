import Divider from "@/components/Divider"
import FAQ from "@/components/FAQ"
import Info from "@/components/Info"
import Intro from "@/components/Intro"
import {changeTheme} from "@/redux/slices/themeSlice";
import {RootState} from "@/redux/store";
import {FaMoon, FaSun} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
function Landing() {
    const dispatch = useDispatch();
    const currentTheme = useSelector((store: RootState) => store.theme.themeState)

    return (
        <div className="dark:bg-gray-950 dark:text-slate-100 text-black bg-slate-100">
            <button className="transition-all border border-black/10 bg-slate-50 dark:bg-gray-950 dark:border-slate-600 opacity-90 px-3 py-3 rounded-full fixed sm:bottom-10 z-50 sm:right-10 bottom-5 right-5" onClick={() => dispatch(changeTheme())}>{currentTheme == "dark" ? <FaMoon className="text-white" /> : (<FaSun />)}</button>
            <Intro />
            <Divider />
            <Info />
            <Divider />
            <FAQ />
        </div>
    )
}

export default Landing
