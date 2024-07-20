import {useEffect, useState} from "react";
import axios from "../utils/axios"
import {movieSearchType} from "@/utils/types";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import MovieCard from "@/components/MovieCard";
function Wishlist() {
    const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState<movieSearchType[]>([]);
    const user = useSelector((store: RootState) => store.user.currentUser)
    useEffect(() => {
        async function fetchwishlist() {
            try {
                const response = await axios.get(`/movie/fetchwishlist/${user?._id}`);
                if (response)
                    setCardData(response.data);
            } catch (e) {

            }
        }
        fetchwishlist();
    }, [])


    return (
        <div className="min-h-screen flex justify-center w-full flex-wrap gap-10 px-3 my-10">
            {
                cardData.map((item, index) => (
                    <div key={index}><MovieCard prop={item} /></div>
                ))
            }
        </div>
    )
}

export default Wishlist;

