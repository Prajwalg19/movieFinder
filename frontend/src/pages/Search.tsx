import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "@/services/axios";
import toast from "react-hot-toast";
import {FaSearch} from "react-icons/fa";
import MovieCard from "@/components/MovieCard";
import {SearchPageSkeleton} from "@/components/Skeleton";
import {movieSearchType} from "@/types/types";
import {AxiosError} from "axios";
import {OMDB_ENDPOINTS} from "@/services/apis";

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState<movieSearchType[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const isMountedRef = useRef(false);

    const [searchParams, setSearchParams] = useState({
        searchTerm: "",
        page: 1,
        type: "",
        year: "",
        plot: "",
    });

    const {page, plot, searchTerm, type, year} = searchParams

    useEffect(() => {
        const isSearched = new URLSearchParams(location.search).get("searchTerm")?.length != 0
        if (isMountedRef.current || isSearched) {
            getMovieData();
        } else {
            isMountedRef.current = true;
        }
    }, [location.search]);

    async function getMovieData() {
        try {
            setLoading(true);
            const allParams = new URLSearchParams(location.search);
            const searchTerm = allParams.get("searchTerm");
            const page = allParams.get("page");
            const type = allParams.get("type");
            const year = allParams.get("year");
            const plot = allParams.get("plot");
            const params = new URLSearchParams({
                searchTerm: searchTerm?.trim() || "",
                page: page || "1",
                type: type || "",
                year: year || "",
                plot: plot || "",
            }).toString();

            setSearchParams({
                searchTerm: searchTerm?.trim() || "",
                page: Number(page) || 1,
                type: type || "",
                year: year || "",
                plot: plot || "",
            })
            if (searchTerm?.length == 0) {
                toast.error("Enter a movie name")
                return;
            }
            const response = await axios.get(`${OMDB_ENDPOINTS.SEARCH}?${params}`);
            if (response?.data?.Response === "True") {
                setMovieData(response.data.Search);
                setTotalResults(Number(response.data.totalResults));
                setMessage(null);
            } else {
                setMessage(response.data.Error || "Something went wrong");
                setMovieData([]);
            }
        } catch (e: unknown) {
            handleError(e);
        } finally {
            setLoading(false);
        }
    }

    function handleError(e: unknown) {
        if (e instanceof AxiosError && e.response) {
            if (e.response.status === 400) {
                toast.error("Enter a value");
            } else if (e.response.status === 404) {
                toast.error("Movie or Series not Found");
            } else if (e.response.status === 403) {
                toast.error("User not logged in");
            }
        } else {
            toast.error("Something went wrong");
        }
        setMovieData([]);
        setMessage(null);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setSearchParams((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSearch(page = 1) {
        const query = `?searchTerm=${searchTerm}&page=${page}&type=${type}&year=${year}&plot=${plot}`
        navigate(`/search${query}`);
    }

    function handlePageChange(newPage: number) {
        window.scrollTo({top: 0, behavior: 'smooth'});
        handleSearch(newPage)
    }

    function renderPageNumbers() {
        const totalPages = Math.ceil(totalResults / 10);
        const maxPageNumbersToShow = 5;
        console.log(page)
        let startPage = Math.max(1, page - Math.floor(maxPageNumbersToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

        if (endPage - startPage + 1 < maxPageNumbersToShow) {
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
            // startPage = 1
        }

        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i).map((i) => (
            <button
                key={i}
                className={`border border-slate-300 px-4 py-2 mx-1 dark:bg-gray-800 dark:text-white ${searchParams.page === i ? 'dark:bg-red-700 bg-red-700 text-white' : 'bg-white text-black'
                    } rounded-md`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        ));
    }

    return (
        <div className="min-h-screen text-black dark:text-slate-100 scroll-mt-10">
            <form onSubmit={(e) => {e.preventDefault(); handleSearch();}} className="w-full justify-center flex flex-col sm:flex-row gap-4 dark:text-white text-black font-clashSemiBold my-10 px-3">
                <div className="relative w-full sm:w-[600px]">
                    <input
                        value={searchParams.searchTerm}
                        type="text"
                        id="searchTerm"
                        onChange={handleChange}
                        className="rounded-md text-lg sm:text-xl py-2 px-3 w-full dark:bg-black/90 dark:text-slate-300 pl-10"
                        placeholder="Search Movies"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button
                    type="submit"
                    className="border-black bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900 py-2 px-5 sm:px-10 text-white border"
                >
                    Search
                </button>
                <select
                    value={searchParams.type}
                    onChange={handleChange}
                    className="text-black dark:text-white dark:bg-black border-slate-500 border rounded-md py-2 px-3 w-full sm:w-auto"
                    id="type"
                >
                    <option value="" hidden>Type</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>
            </form>

            {loading ? (
                <SearchPageSkeleton />
            ) : message ? (
                <div className="flex w-full h-full font-clashSemiBold text-2xl justify-center mt-20">
                    <span>{message}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-10">
                    <div className="flex justify-center w-full flex-wrap gap-10 px-3">
                        {movieData.map((item, index) => (
                            <div key={index}>
                                <MovieCard prop={item} />
                            </div>
                        ))}
                    </div>

                    {movieData.length > 0 && (
                        <div className="flex justify-center items-center px-2 gap-3 flex-wrap text-white">
                            <button
                                disabled={searchParams.page === 1}
                                onClick={() => handlePageChange(searchParams.page - 1)}
                                className="md:text-lg text-sm font-clashSemiBold rounded-md bg-black border border-slate-700 px-3 py-2 disabled:bg-gray-500"
                            >
                                Prev
                            </button>
                            <div className="flex flex-wrap md:text-lg text-sm justify-center items-center gap-2 text-white">
                                {renderPageNumbers()}
                            </div>
                            <button
                                disabled={searchParams.page * 10 >= totalResults}
                                onClick={() => handlePageChange(searchParams.page + 1)}
                                className="md:text-lg text-sm disabled:bg-gray-600 border rounded-md font-clashSemiBold bg-black border-slate-500 px-3 py-2"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
