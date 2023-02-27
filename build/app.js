"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const constants_1 = __importDefault(require("./utils/constants"));
const controller_1 = __importDefault(require("./controllers/controller"));
const database_1 = __importDefault(require("./configs/database"));
const app = (0, express_1.default)();
const { MESSAGES } = constants_1.default;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
(0, database_1.default)();
const PORT = process.env.PORT || 5000;
// base API
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});
// fetch all rooms
app.get("/api/v1/rooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield controller_1.default.getAllRooms();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: (err === null || err === void 0 ? void 0 : err.message) || MESSAGES.ERROR, success: false });
    }
}));
// fetch a particular room by Id
app.get("/api/v1/room/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield controller_1.default.getRoomById(req.params.id);
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: room });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: (err === null || err === void 0 ? void 0 : err.message) || MESSAGES.ERROR, success: false });
    }
}));
// fetch a room by search or filter
app.get("/api/v1/room-search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let roomName = (_a = req.query.roomName) === null || _a === void 0 ? void 0 : _a.toString();
    let roomType = (_b = req.query.roomType) === null || _b === void 0 ? void 0 : _b.toString();
    let maxPrice = (_c = req.query.maxPrice) === null || _c === void 0 ? void 0 : _c.toString();
    let minPrice = Number(req.query.minPrice);
    if (!roomName) {
        roomName = "";
    }
    if (!roomType) {
        roomType = "";
    }
    if (!maxPrice) {
        maxPrice = "";
    }
    if (!minPrice) {
        minPrice = 0;
    }
    try {
        const room = yield controller_1.default.findRoom(roomName, roomType, maxPrice, minPrice);
        res.status(200).send({ message: MESSAGES.FETCHED, success: true, room });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// fetch all room_types
app.get("/api/v1/room-types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomTypes = yield controller_1.default.getAllRoomTypes();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// fetch a particular room-type by Id
app.get("/api/v1/room-type/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomType = yield controller_1.default.getRoomTypeById(req.params.id);
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// create room
app.post("/api/v1/room", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, room_type, price } = req.body;
    try {
        if (!name || !price || !room_type)
            throw new Error("Please provide all the required fields");
        const data = yield controller_1.default.addRoom(name, price, room_type);
        res.status(201).send({ message: MESSAGES.CREATED, success: true, data });
    }
    catch (err) {
        res
            .status(501)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// create room_type
app.post("/api/v1/room_type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controller_1.default.addRoomType(req.body);
        res.status(201).send({ message: MESSAGES.CREATED, success: true, data });
    }
    catch (err) {
        res
            .status(501)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// edit room
app.patch("/api/v1/room/:roomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        const body = req.body;
        const data = yield controller_1.default.editRoomById(roomId, body);
        res.status(201).send({ message: MESSAGES.UPDATED, success: true, data });
    }
    catch (err) {
        res
            .status(501)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// edit room_type
app.patch("/api/v1/room-type/:roomTypeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomTypeId } = req.params;
        const body = req.body;
        const data = yield controller_1.default.editRoomTypeById(roomTypeId, body);
        res.status(201).send({ message: MESSAGES.UPDATED, success: true, data });
    }
    catch (err) {
        res
            .status(501)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// To delete room
app.delete("/api/v1/room/:roomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        const data = yield controller_1.default.deleteRoomById(roomId);
        res.status(200).send({ message: MESSAGES.DELETED, success: true, data });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
// To delete room_type
app.delete("/api/v1/room-types/:roomTypeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomTypeId } = req.params;
        const data = yield controller_1.default.deleteRoomTypeById(roomTypeId);
        res.status(200).send({ message: MESSAGES.DELETED, success: true, data });
    }
    catch (err) {
        res.status(500).send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}));
app.listen(PORT, () => {
    // To start up the server
    console.log(`Server started on PORT: ${PORT}`);
});
exports.default = app;
