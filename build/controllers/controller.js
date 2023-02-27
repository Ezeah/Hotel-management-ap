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
const roomModel_1 = __importDefault(require("../models/roomModel"));
const roomTypeModel_1 = __importDefault(require("../models/roomTypeModel"));
class Controller {
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.find();
        });
    }
    addRoom(name, price, room_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRoom = {
                name,
                price,
                room_type,
            };
            return yield new roomModel_1.default(newRoom).save();
        });
    }
    getRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findOne({ _id: id });
        });
    }
    findRoom(roomName, roomType, maxPrice, minPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.find()
                .and([
                {
                    $or: [
                        { name: roomName },
                        { price: { $lt: maxPrice, $gt: minPrice } },
                    ],
                },
                {
                    $or: [
                        { path: "room_type", match: roomType },
                        { price: { $lt: maxPrice, $gt: minPrice } },
                    ],
                },
            ])
                .populate("room_type");
        });
    }
    editRoomById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findByIdAndUpdate({ _id: id }, data, { new: true });
        });
    }
    deleteRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findByIdAndDelete({ _id: id });
        });
    }
    deleteRoomTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomModel_1.default.findByIdAndDelete({ _id: id });
        });
    }
    getAllRoomTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomTypeModel_1.default.find();
        });
    }
    addRoomType(room) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomTypeModel_1.default.create(room);
        });
    }
    getRoomTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomTypeModel_1.default.findOne({ _id: id });
        });
    }
    editRoomTypeById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomTypeModel_1.default.findByIdAndUpdate({ _id: id }, data, { new: true });
        });
    }
    deleteRoomTypesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield roomTypeModel_1.default.findByIdAndDelete({ _id: id });
        });
    }
}
exports.default = new Controller();
