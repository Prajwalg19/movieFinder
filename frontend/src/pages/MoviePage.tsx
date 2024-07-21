import {useEffect, useState} from "react";
import axios from "../utils/axios";
import {useParams} from "react-router-dom";
import {movieSpecificType} from "@/utils/types";
import toast from "react-hot-toast";
import {Spinner} from "flowbite-react";
import {FaImdb} from 'react-icons/fa';
import {SiRottentomatoes} from "react-icons/si";
import {MdOutlineMovie} from 'react-icons/md';
import {motion} from 'framer-motion';

export default function MoviePage() {
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState<null | movieSpecificType>(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchMovieInfo = async () => {
            try {
                const response: {data: movieSpecificType} = await axios.get(`/movie/${id}`);
                if (response?.data?.Response === "True") {
                    setMovieData(response.data);
                } else {
                    toast.error(response.data?.Response || "Let's give it another try");
                    setMovieData(null);
                }
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setMovieData(null);
                toast.error("Something went wrong");
            }
        };
        fetchMovieInfo();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black dark:text-slate-100 dark:bg-gray-950">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 md:p-8 p-3 font-clashRegular">
            {movieData && (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="mx-auto bg-white border dark:border-slate-600 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
                >
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <motion.img
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                                className="h-96 w-full object-cover md:h-full md:w-80"
                                src={movieData.Poster !== "N/A" ? movieData.Poster : "/ImagePlaceholder.png"}
                                alt="Poster"
                            />
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl text-red-700 font-clashSemiBold dark:text-gray-100">
                                    {movieData.Title}
                                </h1>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {movieData.Genre.split(",").map((genre, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold"
                                    >
                                        {genre.trim()}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 space-y-2">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    {movieData.Released}
                                </p>

                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    {movieData.Plot}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Runtime:</strong> {movieData.Runtime}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Rated:</strong> {movieData.Rated}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Director:</strong> {movieData.Director}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Writer:</strong> {movieData.Writer}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Actors:</strong> {movieData.Actors}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Language:</strong> {movieData.Language}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Country:</strong> {movieData.Country}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Awards:</strong> {movieData.Awards}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Metascore:</strong> {movieData.Metascore}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">IMDb Rating:</strong> {movieData.imdbRating}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">IMDb Votes:</strong> {movieData.imdbVotes}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Type:</strong> {movieData.Type}
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                                    <strong className="font-clashSemiBold">Box Office:</strong> {movieData.BoxOffice}
                                </p>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <FaImdb className="text-4xl mr-2 text-yellow-600" />
                                    <span className="text-lg md:text-xl">
                                        {movieData.Ratings.find(r => r.Source === "Internet Movie Database")?.Value || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                                    <SiRottentomatoes className="text-4xl mr-2 text-red-600" />
                                    <span className="text-lg md:text-xl">
                                        {movieData.Ratings.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                                    <MdOutlineMovie className="text-4xl mr-2 text-green-600" />
                                    <span className="text-lg md:text-xl">
                                        {movieData.Ratings.find(r => r.Source === "Metacritic")?.Value || "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
