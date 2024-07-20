import {useEffect, useState} from "react";
import axios from "../utils/axios";
import {useParams} from "react-router-dom";
import {movieSpecificType} from "@/utils/types";
import toast from "react-hot-toast";
import {Spinner} from "flowbite-react";
import {FaImdb} from 'react-icons/fa';
import {SiRottentomatoes} from "react-icons/si";
import {MdOutlineMovie} from 'react-icons/md';

export default function MoviePage() {
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState<null | movieSpecificType>(null);
    const params = useParams();

    useEffect(() => {
        async function fetchMovieInfo() {
            try {
                const response: {data: movieSpecificType} = await axios.get(`/movie/${params.id}`);
                if (response && response.data) {
                    if (response.data.Response === "True") {
                        setMovieData(response.data);
                    } else {
                        toast.error(response.data.Response);
                        setMovieData(null);
                    }
                } else {
                    setMovieData(null);
                    toast.error("Let's give it another try");
                }
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setMovieData(null);
                toast.error("Something went wrong");
            }
        }
        fetchMovieInfo();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen h-full w-full flex justify-center items-center bg-slate-100 dark:bg-black">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black h-full p-8 font-clashRegular w-full">
            {movieData && (
                <div className="w-full mx-auto h-full overflow-hidden">
                    <div className="p-4 md:flex md:items-start">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-full w-full object-cover md:h-full md:w-80"
                                src={movieData.Poster != "N/A" ? movieData.Poster : "/ImagePlaceholder.png"}
                                alt="Poster"
                            />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                            <h1 className="text-4xl text-red-700 font-clashSemiBold dark:text-gray-100">{movieData.Title}</h1>
                            <div className="mt-2">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Year:</strong> {movieData.Year}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Rated:</strong> {movieData.Rated}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Released:</strong> {movieData.Released}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Runtime:</strong> {movieData.Runtime}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Director:</strong> {movieData.Director}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Writer:</strong> {movieData.Writer}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Actors:</strong> {movieData.Actors}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Plot:</strong> {movieData.Plot}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Language:</strong> {movieData.Language}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Country:</strong> {movieData.Country}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Awards:</strong> {movieData.Awards}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Metascore:</strong> {movieData.Metascore}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">IMDb Rating:</strong> {movieData.imdbRating}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">IMDb Votes:</strong> {movieData.imdbVotes}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Type:</strong> {movieData.Type}</p>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300"><strong className="font-clashSemiBold">Box Office:</strong> {movieData.BoxOffice}</p>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <FaImdb className="text-4xl mr-2 text-yellow-600" />
                                    <span className="text-lg md:text-xl">{movieData.Ratings.find(r => r.Source === "Internet Movie Database")?.Value || "N/A"}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                                    <SiRottentomatoes className="text-4xl mr-2 text-red-600" />
                                    <span className="text-lg md:text-xl">{movieData.Ratings.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A"}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                                    <MdOutlineMovie className="text-4xl mr-2 text-green-600" />
                                    <span className="text-lg md:text-xl">{movieData.Ratings.find(r => r.Source === "Metacritic")?.Value || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
