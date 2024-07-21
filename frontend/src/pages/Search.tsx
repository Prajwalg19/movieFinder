import MovieCard from "@/components/MovieCard";
import {FaSearch} from "react-icons/fa";
import {useEffect, useState, useCallback} from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {movieSearchType} from "@/utils/types";
import {Spinner} from "flowbite-react";
import {useLocation, useNavigate} from "react-router-dom";
import debounce from 'lodash.debounce';

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState<movieSearchType[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const queryString = location.search;
    const allQueryParams = new URLSearchParams(queryString);

    const [searchParam, setSearchParam] = useState({
        searchTerm: allQueryParams.get("searchTerm") ?? "",
        page: parseInt(allQueryParams.get("page") ?? "1", 10),
        plot: allQueryParams.get('plot') ?? null,
        year: allQueryParams.get('year') ?? null,
        type: allQueryParams.get('type') ?? null
    });

    const {searchTerm, page, plot, year, type} = searchParam;

    useEffect(() => {
        if (searchTerm === "") return;
        getMovieData();
    }, [searchParam.page, searchParam.type, searchParam.year, searchParam.plot, allQueryParams.get("searchTerm")]);

    useEffect(() => {
        const params = {
            searchTerm: allQueryParams.get("searchTerm") ?? "",
            page: parseInt(allQueryParams.get("page") ?? "1", 10),
            plot: allQueryParams.get('plot') ?? null,
            year: allQueryParams.get('year') ?? null,
            type: allQueryParams.get('type') ?? null
        };
        setSearchParam(params);
    }, [queryString]);

    const debouncedSearch = useCallback(
        debounce((newSearchTerm) => {
            setSearchParam((prev) => ({...prev, searchTerm: newSearchTerm, page: 1}));
            updateUrlParams({searchTerm: newSearchTerm, page: 1});
        }, 1500), []
    );

    async function getMovieData() {
        try {
            setLoading(true);
            const searchParams = new URLSearchParams({
                searchTerm: searchTerm.trim(),
                page: page.toString(),
                type: type ?? "",
                year: year ?? "",
                plot: plot ?? ""
            }).toString();

            const response = await axios.get(`/movie/search?${searchParams}`);
            if (response && response.data) {
                if (response.data.Response === "True") {
                    setMovieData(response.data.Search);
                    setTotalResults(Number(response.data.totalResults));
                    setMessage(null);
                } else {
                    setMessage(response.data.Error || "Something went wrong");
                    setMovieData([]);
                }
            } else {
                toast.error("Something went wrong, Let's give it another try");
                setMovieData([]);
                setMessage(null);
            }
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status === 400) {
                    toast.error("Bad request");
                } else if (e.response.status === 404) {
                    toast.error("Request Not Found");
                } else if (e.response.status === 403) {
                    toast.error("User not logged in");
                }
            } else {
                toast.error("Something went wrong");
            }
            setMovieData([]);
            setMessage(null);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setSearchParam((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    }

    function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newSearchTerm = e.target.value;
        setSearchParam((prev) => ({...prev, searchTerm: newSearchTerm}));
        debouncedSearch(newSearchTerm);
    }

    function updateUrlParams(newParams: any) {
        const queryString = new URLSearchParams({...searchParam, ...newParams}).toString();
        navigate(`/search?${queryString}`);
    }

    function handlePageChange(newPage: number) {
        setSearchParam((prev) => ({...prev, page: newPage}));
        updateUrlParams({page: newPage});
    }

    function renderPageNumbers() {
        const totalPages = Math.ceil(totalResults / 10);
        const maxPageNumbersToShow = 5;
        let startPage = Math.max(1, page - Math.floor(maxPageNumbersToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

        if (endPage - startPage + 1 < maxPageNumbersToShow) {
            startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        }

        const pageNumbers = [];

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={` border border-slate-300 px-4 py-2 mx-1 dark:bg-gray-800 dark:text-white ${page === i ? 'dark:bg-red-700 bg-red-700 text-white' : 'bg-white text-black'} rounded-md`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    }

    return (
        <div className="min-h-screen text-black dark:text-slate-100 scroll-mt-10" id="top">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParam((prev) => ({...prev, page: 1}));
                    updateUrlParams({page: 1});
                    getMovieData();
                }}
                className="w-full justify-center flex flex-col sm:flex-row gap-4 dark:text-white text-black font-clashSemiBold my-10 px-3"
            >
                <div className="relative w-full sm:w-[600px]">
                    <input
                        value={searchTerm}
                        type="text"
                        id="searchTerm"
                        onChange={handleSearchTermChange}
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
                    value={type ?? ""}
                    onChange={(e) => {handleChange(e); updateUrlParams({type: e.target.value});}}
                    className="text-black dark:text-white dark:bg-black border-slate-500 border rounded-md py-2 px-3 w-full sm:w-auto"
                    id="type"
                >
                    <option disabled hidden value="">Type</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>
            </form>

            {loading ? (
                <div className="min-h-screen h-full w-full flex justify-center items-center">
                    <Spinner size="xl" />
                </div>
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
                        <div className="flex items-center px-2 gap-3 flex-wrap text-white">
                            <button
                                disabled={page === 1}
                                onClick={() => handlePageChange(page - 1)}
                                className="md:text-lg text-sm font-clashSemiBold rounded-md bg-black border border-slate-700 px-3 py-2 disabled:bg-gray-500"
                            >
                                <a href="#top">Prev</a>
                            </button>
                            <div className="flex flex-wrap md:text-lg text-sm items-center gap-2 text-white">
                                {renderPageNumbers()}
                            </div>
                            <button
                                disabled={page * 10 >= totalResults}
                                onClick={() => handlePageChange(page + 1)}
                                className="md:text-lg text-sm disabled:bg-gray-600 border rounded-md font-clashSemiBold bg-black border-slate-500 px-3 py-2"
                            >
                                <a href="#top">Next </a>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
