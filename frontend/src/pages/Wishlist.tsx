import {useEffect, useState} from "react";
import {movieSearchType} from "@/types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import MovieCard from "@/components/MovieCard";
import {addcurrentWishlist} from "@/redux/slices/wishlistSlice";
import {motion} from "framer-motion";
import {SearchPageSkeleton} from "@/components/Skeleton";
import {ProgressBar} from "@/components/Utils/ProgressBar";
import Typo from "@/Typography";
import {handleFetchWislist} from "@/services/wishlist/wishlist";
import {logOut} from "@/redux/slices/userSlice";
import toast from "react-hot-toast";

function Wishlist() {
    const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState<movieSearchType[]>([]);
    const [filteredData, setFilteredData] = useState<movieSearchType[]>([]);
    const [filter, setFilter] = useState("all");
    const user = useSelector((store: RootState) => store.user.currentUser)
    const dispatch = useDispatch();


    const [movieCount, setMovieCount] = useState(0);
    const [seriesCount, setSeriesCount] = useState(0);
    const [episodeCount, setEpisodeCount] = useState(0);

    useEffect(() => {
        const movies = cardData.filter(item => item!.Type === 'movie').length;
        const series = cardData.filter(item => item!.Type === 'series').length;
        const episodes = cardData.filter(item => item!.Type === 'episode').length;

        setMovieCount(movies);
        setSeriesCount(series);
        setEpisodeCount(episodes);
    }, [cardData]);

    useEffect(() => {
        async function fetchwishlist() {
            try {
                setLoading(true)
                if (!user?._id) {
                    dispatch(logOut());
                    return
                }
                const response = await handleFetchWislist(user?._id);
                if (response) {
                    setCardData(response);
                    setFilteredData(response);
                    let arr;
                    arr = response.map((item: movieSearchType) => item?.imdbID)
                    dispatch(addcurrentWishlist(arr));
                } else {
                    toast.error("Unexpected error occured");
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    toast.error(e.message);
                } else {
                    toast.error("Internal server error")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchwishlist();
    }, [])

    useEffect(() => {
        if (filter === "all") {
            setFilteredData(cardData);
        } else {
            setFilteredData(cardData.filter(item => item!.Type === filter));
        }
    }, [filter, cardData]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    return (
        <div className="min-h-screen">
            {loading ? (
                <SearchPageSkeleton />
            ) : cardData.length === 0 ? (
                <Typo variant="h4" className="font-clashSemiBold min-h-screen flex justify-center items-center">Your wishlist is empty</Typo>
            ) : (
                <>
                    <div className="flex justify-center my-5">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="dark:text-white dark:bg-black text-black p-2 font-clashRegular rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All</option>
                            <option value="movie">Movies</option>
                            <option value="series">Series</option>
                            <option value="episode">Episodes</option>
                        </select>
                    </div>
                    <div className="w-full px-6 max-w-lg mx-auto my-5">
                        <ProgressBar movies={movieCount} series={seriesCount} episodes={episodeCount} />
                    </div>
                    <motion.div
                        initial={{x: -30, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.3}}
                        className="flex justify-center w-full flex-wrap gap-10 px-3 my-10"
                    >
                        {filteredData.map((item, index) => (
                            <div key={index}><MovieCard prop={item} /></div>
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    )
}

export default Wishlist;
