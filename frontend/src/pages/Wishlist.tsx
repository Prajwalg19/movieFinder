import {useEffect, useState} from "react";
import axios from "../utils/axios"
import {movieSearchType} from "@/utils/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import MovieCard from "@/components/MovieCard";
import {addcurrentWishlist} from "@/redux/slices/wishlistSlice";
import {motion} from "framer-motion";
import {SearchPageSkeleton} from "@/components/Skeleton";
import {ProgressBar} from "@/components/ProgressBar";

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
                const response = await axios.get(`/movie/fetchwishlist/${user?._id}`);
                if (response) {
                    setCardData(response.data);
                    setFilteredData(response.data);
                    let arr;
                    arr = response.data.map((item: movieSearchType) => item?.imdbID)
                    dispatch(addcurrentWishlist(arr));
                }
                setLoading(false)
            } catch (e) {
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
                <div className="font-clashSemiBold text-3xl min-h-screen flex justify-center items-center">Your wishlist is empty</div>
            ) : (
                <>
                    <div className="flex justify-center my-5">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="dark:text-white dark:bg-black text-black p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
