import {movieSearchType} from "@/types/types";
import {Link} from "react-router-dom";
import {BsBookmarkCheckFill} from "react-icons/bs";
import {BsBookmarkPlusFill} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {changeWishState, logOutClear} from "@/redux/slices/wishlistSlice";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import toast from "react-hot-toast";
import {logOut} from "@/redux/slices/userSlice";
import {AxiosError} from "axios";
import {handleWishListUpdate} from "@/services/wishlist/wishlist";
export default function MovieCard({
    prop
}: {prop: movieSearchType}) {
    const dispatch = useDispatch();
    const wishLists = useSelector((store: RootState) => store.wishlist.allWishListMovieData);
    const user = useSelector((store: RootState) => store.user.currentUser);
    async function handleWishList(movieData: movieSearchType) {
        try {
            if (!user) {
                dispatch(logOut())
                dispatch(logOutClear())
                return;
            }
            dispatch(changeWishState(movieData));
            await handleWishListUpdate({movieData: movieData, userId: user._id})
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response != undefined) {
                if (e.response.status == 401 || e.response.status == 403) {
                    dispatch(logOut())
                    dispatch(logOutClear());
                    toast.error("Session expired. Please log in again.");
                }
                else {
                    toast.error("Wishlist addition failed. Please try again.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
            dispatch(changeWishState(movieData));
        }
    }
    return (
        <div className="group relative w-[350px] dark:bg-gray-900 bg-slate-200 font-clashRegular border border-red-800 hover:border-2 h-[520px] overflow-hidden rounded-tr-3xl rounded-bl-3xl transition-all">
            <button className={`absolute top-0 left-0 px-1 py-5 transition-all ${wishLists.length != 0 && wishLists.includes(prop!.imdbID) ? "bg-green-500" : "bg-red-600"} rounded-br-md flex justify-center items-center`} onClick={() => handleWishList(prop)}>
                {wishLists.length != 0 && wishLists.includes(prop?.imdbID!) ? <BsBookmarkCheckFill className="text-3xl text-white" /> : <BsBookmarkPlusFill className="text-3xl text-white" />}
            </button>
            <Link to={`/movie/${prop?.imdbID}`}>
                <img src={prop && prop.Poster && prop.Poster !== "N/A" ? prop.Poster : "/ImagePlaceholder.png"} alt="post cover" className="h-[400px] w-full object-cover group-hover:h-[300px] transition-all duration-300" />
            </Link>
            <div className="p-3 flex flex-col gap-2">
                <Link to={`/movie/${prop?.imdbID}`} className="text-lg font-clashSemiBold truncate line-clamp-2">{prop?.Title}</Link>
                <div>{prop?.Year}</div>
                <Link
                    to={`/movie/${prop?.imdbID}`}
                    className="font-clashBold z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-all duration-300 text-center py-2 rounded-md m-2"
                >
                    Details
                </Link>
            </div>
        </div>

    )

}
