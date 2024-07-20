import MovieCard from "@/components/MovieCard";
import {FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {movieSearchType} from "@/utils/types";
import {Spinner} from "flowbite-react";
import {useLocation, useNavigate} from "react-router-dom";

export default function Search() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState<[] | movieSearchType[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const queryString = location.search; // maan i get confused with useLocation , useParams. location for full path and useParams for parameters in router dom.
    const allQueryParams = new URLSearchParams(queryString)
    const [searchParam, setSearchParam] = useState({
        searchTerm: allQueryParams.get("searchTerm") ?? "",
        page: 1,
        plot: null,
        year: null,
        type: null
    });
    const {searchTerm, page, plot, year, type} = searchParam;

    useEffect(() => {
        getMovieData();
    }, [queryString]);

    async function getMovieData() {
        try {
            setLoading(true);
            const searchTerm = allQueryParams.get("searchTerm") ?? "";
            const page = allQueryParams.get("page") ?? 1;
            const year = allQueryParams.get('year') ?? null;
            const type = allQueryParams.get('type') ?? null;
            const plot = allQueryParams.get('plot') ?? null;
            if (searchTerm == "" || !searchTerm) {
                setLoading(false);
                return
            };
            let queryString1 = `searchTerm=${searchTerm.trim()}&page=${page}&type=${type}&year=${year}&plot=${plot}`;
            const response: {data: {Search: movieSearchType[], totalResults: String, Response: String, Error?: String}} | null = await axios.get(`/movie/search?${queryString1}`);
            if (response && response.data) {
                if (response.data.Response == "True") {
                    setMovieData(response.data.Search)
                    setTotalResults(Number(response.data.totalResults));
                    setMessage(null);
                }
                else {
                    if (response.data.Error == "Too many results.") {
                        setMessage("Be bit more specific");
                    } else {
                        setMessage(`${response.data.Error}`)
                    }
                    setMovieData([]);
                }
            } else {
                toast.error("Something went wrong, Lets give it another try")
                setMovieData([]);
                setMessage(null);
            }
            setLoading(false);

        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status == 400) {
                    toast.error("Bad request");
                }
                else if (e.response.status == 404) {
                    toast.error("Request Not Found");
                } else if (e.response.status == 403) {
                    toast.error("User not logged in");
                }
            } else {
                toast.error("Something went wrong");
            }
            setMovieData([]);
            setLoading(false);
            setMessage(null);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setSearchParam((prev) => (
            {
                ...prev,
                [e.target.id]: e.target.value
            }
        ))
    }
    function searchMovies() {
        const queryString = `searchTerm=${searchTerm.trim()}&page=${page}&type=${type}&year=${year}&plot=${plot}`;
        navigate(`/search?${queryString}`);
    }


    // async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         const response: {data: {Search: movieSearchType[], totalResults: String, Response: String, Error?: String}} | null = await axios.get(`/movie/search?searchTerm=${searchTerm.trim()}&page=${page}&plot=${plot}&year=${year}&type=${type}`);
    //         if (response && response.data) {
    //             if (response.data.Response == "True") {
    //                 setMovieData(response.data.Search)
    //                 setTotalResults(Number(response.data.totalResults));
    //             }
    //             else {
    //                 if (response.data.Error == "Too many results.") {
    //                     toast.error("Be bit more specific");
    //                 } else {
    //                     toast.error(`${response.data.Error}`)
    //                 }
    //                 setMovieData([]);
    //             }
    //         } else {
    //             toast.error("Lets give it another try")
    //             setMovieData([]);
    //         }
    //         setLoading(false);
    //     } catch (e: unknown) {
    //         if (e instanceof AxiosError && e.response) {
    //             if (e.response.status == 400) {
    //                 toast.error("Bad request");
    //             }
    //             else if (e.response.status == 404) {
    //                 toast.error("Request Not Found");
    //             } else if (e.response.status == 403) {
    //                 toast.error("User not logged in");
    //             }
    //         } else {
    //             toast.error("Something went wrong");
    //         }
    //         setMovieData([]);
    //         setLoading(false);
    //     }
    // }

    return (

        <div className="min-h-screen">
            <form onSubmit={(e) => {e.preventDefault(); searchMovies();}} className="w-full justify-center flex flex-col sm:flex-row gap-4 dark:text-white text-black font-clashSemiBold my-10 px-3">
                <input value={searchTerm} type="text" id="searchTerm" onChange={handleChange} className="rounded-md text-lg sm:text-xl py-2 px-3 w-full sm:w-[600px] dark:bg-black/90 dark:text-slate-300" placeholder="Search Movies" />
                <button className="border-black bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900 py-2 px-5 sm:px-10 text-white border">Search</button>
                <select defaultValue="" onChange={(e) => handleChange(e)} className="text-black dark:text-white dark:bg-black border-slate-500 border rounded-md py-2 px-3 w-full sm:w-auto" id="type">
                    <option disabled hidden value="">Type</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>
            </form>

            {
                loading ? (
                    <div className="min-h-screen h-full w-full flex justify-center items-center">
                        <Spinner size="xl" />
                    </div>
                ) :
                    message ? (<div className="flex w-full h-full font-clashSemiBold text-2xl justify-center mt-20"><span>{message}</span></div>) :

                        <div className="flex justify-center w-full flex-wrap gap-10 px-3">
                            {
                                movieData.map((item, index) => (
                                    <div key={index}>
                                        <MovieCard prop={item} />
                                    </div>
                                ))
                            }
                        </div>
            }
        </div>
    )
}
