import {useEffect, useState} from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {Spinner} from "flowbite-react";
import Carousel from "../components/Carousel"
export default function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [carouselData, setCarouselData] = useState([]);
    useEffect(() => {
        async function fetchCarouselData() {
            try {

                // const response = await axios.get(``);
                // setCarouselData(response.data);
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
        <div className="">
            <Carousel />
        </div>
    )
}
