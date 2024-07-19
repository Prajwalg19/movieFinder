import {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {Spinner} from "flowbite-react";
import Carousel from "../components/Carousel"
export default function Home() {
    const [loading, setLoading] = useState(true);
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

            const response = await axios.get(`/movie/search?searchTerm=${searchTerm}&page=${page}&plot=${plot}&year=${year}&type=${type}`);
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
            setLoading(false);
        }


    }
    useEffect(() => {
        async function fetchCarouselData() {
            try {

                const response = await axios.get(`/movie/search?searchTerm=${searchTerm}&page=${page}&plot=${plot}&year=${year}&type=${type}`);

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
                setLoading(false);
            }
        }
        fetchCarouselData();
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen h-full w-full flex justify-center items-center">
                <Spinner size="xl" />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Carousel />
            <form onSubmit={handleSubmit} className="w-full justify-center my-3 flex flex-row gap-4 font-clashSemiBold px-2">
                <input type="text" id="searchTerm" onChange={handleChange} className="rounded-md py-2 px-3 w-[600px]" placeholder="Search Movies" />
                <button className="border-black bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900 py-2 px-10 text-white border">Submit</button>
            </form>
        </div>
    )
}
