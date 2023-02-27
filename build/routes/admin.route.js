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
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const router = express_1.default.Router();
// Route to create a new room type
router.post('/room-types', authorize_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Only admins can access this route
    try {
        // Add new room type logic here
        res.status(201).json({ message: 'Room type created successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Route to update an existing room type
router.put('/room-types/:id', authorize_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Only admins can access this route
    try {
        // Update room type logic here
        res.status(200).json({ message: 'Room type updated successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}));
// Route to delete an existing room type
router.delete('/room-types/:id', authorize_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Only admins can access this route
    try {
        // Delete room type logic here
        res.status(200).json({ message: 'Room type deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
