import {movieSearchType} from "@/utils/types";
import {createSlice} from "@reduxjs/toolkit";

type typeOfInitState = {
    allWishListMovieData: string[]
}

const initialState: typeOfInitState = {
    allWishListMovieData: [],
}

const wishListSlice = createSlice({
    initialState: initialState,
    name: "wishlist",
    reducers: {
        changeWishState(state, action) {
            const movieData: movieSearchType = action.payload;
            if (state.allWishListMovieData.includes(movieData?.imdbID!)) {
                state.allWishListMovieData = state.allWishListMovieData.filter((item) => {
                    if (item != movieData?.imdbID) return item;
                })

            } else {
                let imdbArr = state.allWishListMovieData;
                imdbArr.push(movieData?.imdbID!)
                state.allWishListMovieData = imdbArr;
            }
        },
    }
})


export const {changeWishState} = wishListSlice.actions;
export default wishListSlice.reducer;


