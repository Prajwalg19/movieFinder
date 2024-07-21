import {useSelector} from "react-redux"
import {RootState} from "@/redux/store"
const ThemeProvider = ({children}: {children: React.ReactNode}) => {

    const theme = useSelector((store: RootState) => store.theme.themeState)
    return (
        <div className={theme} >
            <div className="dark:text-slate-100 text-black bg-slate-100 dark:bg-gray-950" >
                {children}
            </div>
        </div>
    )
}
export default ThemeProvider;

