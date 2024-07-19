import mongoose from "mongoose";

interface MovieType {
    Title: string;
    Year: string | null;
    imdbID: string | null;
    Type: "movie" | "series" | "episode";
    Poster: string | null;
}

const userWishListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "users"
        },
        list: {
            type: Array<MovieType>

        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("wishlist", userWishListSchema);

