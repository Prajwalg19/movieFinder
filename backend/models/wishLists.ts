import mongoose from "mongoose";
import userModel from "./userModel";

interface MovieType {
    Title: string;
    Year: string | null;
    imdbID: string;
    Type: "movie" | "series" | "episode";
    Poster: string | null;
}

const userWishListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: userModel
        },
        moviesData: {
            type: new Array<MovieType>,
            default: []
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("wishlist", userWishListSchema);

