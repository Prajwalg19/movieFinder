import {useEffect, useState} from "react";
import axios from "../utils/axios";
import {useParams} from "react-router-dom";
import {movieSpecificType} from "@/utils/types";
import toast from "react-hot-toast";
import {Spinner} from "flowbite-react";
import {FaCalendarAlt, FaClock, FaImdb, FaStar, FaThumbsUp} from 'react-icons/fa';
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
                setMovieData(null);
                toast.error("Something went wrong");
            }finally{
                setLoading(false);
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
        <div className="min-h-screen pt-5 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8">

            {movieData && (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="border dark:border-slate-600 rounded-xl max-w-[97rem] mx-auto"
                >
                    <div className="flex flex-col lg:flex-row bg-slate-100 dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                        <div className="lg:w-1/3">
                            <motion.img
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                                className="w-full h-full object-cover"
                                src={movieData.Poster !== "N/A" ? movieData.Poster : "/ImagePlaceholder.png"}
                                alt="Poster"
                            />
                        </div>
                        <div className="lg:w-2/3 p-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movieData.Title}</h1>
                            <div className="flex flex-wrap items-center gap-6 mb-6 text-lg">
                                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 rounded-full px-3 py-1">
                                    <FaStar className="text-yellow-500 mr-2" />
                                    <span className="font-semibold">{movieData.imdbRating}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaThumbsUp className="text-blue-500 dark:text-blue-400 mr-2" />
                                    <span>{movieData.imdbVotes}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="text-gray-500 dark:text-gray-400 mr-2" />
                                    <span>{movieData.Runtime}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                                    <span>{movieData.Year}</span>
                                </div>
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{movieData.Plot}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">Director</h3>
                                    <p className="text-lg">{movieData.Director}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">Stars</h3>
                                    <p className="text-lg">{movieData.Actors}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movieData.Genre.split(",").map((genre, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-semibold"
                                            >
                                                {genre.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">Languages</h3>
                                    <p className="text-lg">{movieData.Language}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">Awards</h3>
                                <p className="text-lg">{movieData.Awards}</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                                    <FaImdb className="text-3xl mr-2 text-yellow-500" />
                                    <span className="text-lg font-semibold">
                                        {movieData.Ratings.find(r => r.Source === "Internet Movie Database")?.Value || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                                    <SiRottentomatoes className="text-3xl mr-2 text-red-500" />
                                    <span className="text-lg font-semibold">
                                        {movieData.Ratings.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                                    <MdOutlineMovie className="text-3xl mr-2 text-green-500" />
                                    <span className="text-lg font-semibold">
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
