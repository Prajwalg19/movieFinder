import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userPfp: {type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fcyb3r_f4ngs%2Fuser-pfp%2F&psig=AOvVaw2iBv4NlXBwQMlncxCSR86N&ust=1721494471284000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJC8hObIs4cDFQAAAAAdAAAAABAR"},
},
    {
        timestamps: true
    })


const userModel = mongoose.model("user", userSchema);
export default userModel;


