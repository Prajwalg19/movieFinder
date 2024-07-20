import {useNavigate} from "react-router-dom";
import Carousel from "../components/Carousel";
import {useState} from "react";

export default function Home() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    function handleSubmit(query: string) {
        navigate(`/search?searchTerm=${query}`);
    }

    return (
        <div className="min-h-screen">
            <Carousel />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(searchText);
                }}
                className="w-full justify-center my-3 flex flex-col sm:flex-row gap-4 dark:text-white text-black font-clashSemiBold px-2"
            >
                <input
                    type="text"
                    id="searchTerm"
                    onChange={(e) => {setSearchText(e.target.value);}}
                    value={searchText}
                    className="rounded-md text-lg sm:text-xl py-2 px-3 w-full sm:w-[600px] dark:bg-gray-800 dark:text-slate-300"
                    placeholder="Search Movies"
                />
                <button
                    className="border-black bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900 py-2 px-5 sm:px-10 text-white border"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
