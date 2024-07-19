import {useEffect, useState} from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {Spinner} from "flowbite-react";
import Carousel from "../components/Carousel"
import {movieSearchType} from "@/utils/types";
import MovieCard from "@/components/MovieCard";
import {FaSearch} from "react-icons/fa";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState<[] | movieSearchType[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [searchParam, setSearchParam] = useState({
        searchTerm: "",
        page: 1,
        plot: null,
        year: null,
        type: null
    });
    const {searchTerm, page, plot, year, type} = searchParam;
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchParam((prev) => (
            {
                ...prev,
                [e.target.id]: e.target.value
            }
        ))
    }
    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const response: {data: {Search: movieSearchType[], totalResults: String, Response: String, Error?: String}} | null = await axios.get(`/movie/search?searchTerm=${searchTerm}&page=${page}&plot=${plot}&year=${year}&type=${type}`);
            if (response && response.data) {
                if (response.data.Response == "True") {
                    setMovieData(response.data.Search)
                    setTotalResults(Number(response.data.totalResults));
                }
                else {
                    if (response.data.Error == "Too many results.") {
                        toast.error("Be bit more specific");
                    } else {
                        toast.error(`${response.data.Error}`)
                    }
                    setMovieData([]);
                }
            } else {
                toast.error("Lets give it another try")
                setMovieData([]);
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
        }
    }


    return (
        <div className="min-h-screen">
            <Carousel />
            <form onSubmit={handleSubmit} className="w-full justify-center my-3 flex flex-row gap-4 font-clashSemiBold px-2">

                <input type="text" id="searchTerm" onChange={handleChange} className="rounded-md py-2 px-3 w-[600px]" placeholder="Search Movies" />
                <button className="border-black bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900 py-2 px-10 text-white border">Submit</button>
            </form>

            {loading ? (
                <div className="min-h-screen h-full w-full flex justify-center items-center">
                    <Spinner size="xl" />
                </div>
            ) :
                <div className="flex max-w-[100rem] w-full mx-auto flex-wrap gap-16 flex-row">
                    {
                        movieData.map((item, index) => (
                            <div key={index}>
                                <MovieCard prop={item} />
                            </div>
                        ))

                    }

                </div>
            } :


        </div>
    )
}
