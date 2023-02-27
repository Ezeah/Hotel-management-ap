"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = __importDefault(require("../utils/constants"));
const { DATABASES } = constants_1.default;
const RoomTypesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: ["Single", "Double", "Triple", "Quad", "Queen", "King", "Twin"],
    },
    description: {
        type: String,
        required: false,
    },
});
const RoomTypes = (0, mongoose_1.model)(DATABASES.ROOM_TYPES, RoomTypesSchema);
exports.default = RoomTypes;
