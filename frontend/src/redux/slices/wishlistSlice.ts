import {movieSearchType} from "@/utils/types";
import {createSlice} from "@reduxjs/toolkit";

type typeOfInitState = {
    allWishListMovieData: Array<String>;
}

const initialState: typeOfInitState = {
    allWishListMovieData: new Array(),
}

const wishListSlice = createSlice({
    initialState: initialState,
    name: "wishlist",
    reducers: {
        addcurrentWishlist: (state, action) => {
            state.allWishListMovieData = action.payload;
        },

        changeWishState: (state, action) => {
            const movieData: movieSearchType = action.payload;
            if (state.allWishListMovieData.includes(movieData?.imdbID!)) {
                let arr;
                arr = (state.allWishListMovieData.filter((item) => {
                    if (item != movieData?.imdbID) return item;
                }
                ))
                state.allWishListMovieData = arr
            } else {
                let imdbArr = state.allWishListMovieData;
                imdbArr.push(movieData?.imdbID!)
                state.allWishListMovieData = imdbArr;
            }
        },
        logOutClear(state) {
            state.allWishListMovieData = [];
        }

    },

})


export const {addcurrentWishlist, changeWishState, logOutClear} = wishListSlice.actions;
export default wishListSlice.reducer;


