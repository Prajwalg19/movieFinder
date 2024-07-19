import mongoose from "mongoose";

const userWishListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "users"
        },
        list: [{
            id: {type: String, default: []}
        }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model("wishlist", userWishListSchema);

