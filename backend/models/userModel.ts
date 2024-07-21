import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userPfp: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"},
},
    {
        timestamps: true
    })


const userModel = mongoose.model("user", userSchema);
export default userModel;


