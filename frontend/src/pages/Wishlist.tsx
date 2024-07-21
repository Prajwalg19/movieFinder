import {useEffect, useState} from "react";
import axios from "../utils/axios"
import {movieSearchType} from "@/utils/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import MovieCard from "@/components/MovieCard";
import {Spinner} from "flowbite-react";
import {addcurrentWishlist} from "@/redux/slices/wishlistSlice";
function Wishlist() {
    const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState<movieSearchType[]>([]);
    const user = useSelector((store: RootState) => store.user.currentUser)
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchwishlist() {
            try {
                setLoading(true)
                const response = await axios.get(`/movie/fetchwishlist/${user?._id}`);
                if (response) {
                    setCardData(response.data);
                    let arr;
                    arr = response.data.map((item: movieSearchType) => item?.imdbID)
                    dispatch(addcurrentWishlist(arr));
                }
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
        fetchwishlist();
    }, [])


    return (
        loading ?
            (
                <div className="min-h-screen h-full w-full flex justify-center items-center">
                    <Spinner size="xl" />
                </div>

            )
            :
            cardData.length == 0 ? (
                <div className="font-clashSemiBold text-3xl min-h-screen flex justify-center items-center">You wishlist is empty</div>
            ) :

                (
                    <div className="min-h-screen flex justify-center w-full flex-wrap gap-10 px-3 my-10">
                        {
                            cardData.map((item, index) => (
                                <div key={index}><MovieCard prop={item} /></div>
                            ))
                        }
                    </div >

                )
    )
}

export default Wishlist;

