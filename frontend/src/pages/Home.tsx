import {useNavigate} from "react-router-dom";
import Carousel from "@/components/Carousel";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "../index.css"
// import {Pagination} from 'swipr/modules';
import {motion} from 'framer-motion';
import {movieSearchType} from "@/types/types";
import {SwiperSlideSkeleton} from "@/components/Skeleton";
import {FaSearch} from "react-icons/fa";
import toast from "react-hot-toast";
import {fetchHomePageMovies} from "@/services/omdb/omdbApis";


export default function Home() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState<movieSearchType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            async function fetchMovie() {
                try {
                    setLoading(true);
                    const response = await fetchHomePageMovies()
                    if (response) {
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
                catch (e) {
                    if (e instanceof Error) {
                        toast.error(e.message);
                    } else {
                        toast.error("Something went wrong")
                    }
                } finally {
                    setLoading(false);
                }
            }
            fetchMovie();
        }
        , [])


    function handleSubmit(query: string) {
        navigate(`/search?searchTerm=${query}`);
    }

    return (
        <div className="min-h-screen">
            <span >
                <Carousel />
            </span>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(searchText);
                }}
                className="w-full justify-center my-3 pt-5 flex flex-col sm:flex-row gap-4 dark:text-white text-black font-clashSemiBold px-2"
            >
                <div className="relative w-full sm:w-[600px]">
                    <input
                        type="text"
                        id="searchTerm"
                        onChange={(e) => {setSearchText(e.target.value);}}
                        value={searchText}
                        className="rounded-md text-lg sm:text-xl py-2 px-3 w-full dark:bg-black/90 dark:text-slate-300 pl-10"
                        placeholder="Search Movies"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button
                    className="border-black bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900 py-2 px-5 sm:px-10 text-white border"
                >
                    Search
                </button>
            </form>

            <div >
                <p className="md:text-3xl text-2xl font-clashSemiBold pt-6 pb-10 pl-3">Recommendations</p>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                >
                    {
                        loading ? (
                            Array(7).fill("a").map((_, index) => (
                                <SwiperSlide key={index} className="cursor-pointer px-3 !w-[280px] md:!w-[350px] !h-[400px] md:!h-[500px] flex justify-center items-center !rounded-lg">
                                    <SwiperSlideSkeleton />
                                </SwiperSlide>
                            ))
                        ) :
                            data.map((item, index) => (
                                <SwiperSlide key={index} className="hover:scale-105 hover:shadow-md transition-all cursor-pointer px-3 !w-[280px] md:!w-[350px] !h-[400px] md:!h-[500px]  flex justify-center items-center !rounded-lg"
                                    onClick={() => {navigate(`/movie/${item?.imdbID}`)}}
                                >
                                    <motion.div
                                        className="dark:border-slate-700 border w-full h-full  overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 "
                                        initial={{y: 100, opacity: 0}}
                                        animate={{y: 0, opacity: 1}}
                                        transition={{duration: 0.3}}
                                    >
                                        {item && (
                                            <img
                                                src={item && item.Poster && item.Poster !== "N/A" ? item.Poster : "/ImagePlaceholder.png"}
                                                alt={item && item.Title}
                                                className="w-full h-full object-cover"
                                            />

                                        )}
                                    </motion.div>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>

            </div>

        </div>
    );
}
