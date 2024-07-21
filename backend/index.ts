import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors";
import {extendedError} from "./utils/customError";
import authRoutes from "./routes/authRoutes"
import cookieParser from "cookie-parser"
import morgan from "morgan";
import movieRoutes from "./routes/movieRoutes"

dotenv.config();

const app = express();
const mongo_con_string = process.env.MONGO_CON_STRING || ""
const port = process.env.PORT || 4500


const corsOptions = {
    origin: ["http://localhost:5173", ""],
    credentials: true
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(morgan("dev"))
mongoose.connect(mongo_con_string).then(
    () => {console.log("Connection successfull")}
).catch(() => {console.log("Couldn't connect to the database")})



app.listen(port, () => {
    console.log("Server started at port", port)
})

app.use("/auth", authRoutes)
app.use("/movie", movieRoutes)

app.use((error: extendedError, _: express.Request, res: express.Response, __: express.NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json(message);

})
