"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = __importDefault(require("../utils/constants"));
function database() {
    console.log("connecting to Mongodb...");
    // console.log(constants.DATABASE_URI);
    mongoose_1.default
        .set("strictQuery", true)
        .connect(constants_1.default.DATABASE_URI, {})
        .then(() => {
        console.log("yes, mongodb is connected.");
    })
        .catch((error) => {
        console.log(error);
    });
}
exports.default = database;
