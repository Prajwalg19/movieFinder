"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongo_con_string = process.env.MONGO_CON_STRING || "";
const port = process.env.PORT || 4500;
const corsOptions = {
    origin: ["http://localhost:5173", ""],
    credentials: true
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
mongoose_1.default.connect(mongo_con_string).then(() => { console.log("Connection successfull"); }).catch(() => { console.log("Couldn't connect to the database"); });
app.listen(port, () => {
    console.log("Server started at port", port);
});
app.use("/auth", authRoutes_1.default);
app.use("/movie", movieRoutes_1.default);
app.use((error, _, res, __) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json(message);
});
