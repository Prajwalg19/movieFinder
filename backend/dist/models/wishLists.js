"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const userWishListSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: userModel_1.default
    },
    moviesData: {
        type: new Array,
        default: []
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("wishlist", userWishListSchema);
