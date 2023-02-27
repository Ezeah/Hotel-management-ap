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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract token from Authorization header and verify it
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, 'blublablue');
        // Find user with matching id and token
        const user = yield user_model_1.default.findOne({
            _id: decoded._id,
            'tokens.token': token,
        });
        // If no user is found, throw an error
        if (!user) {
            throw new Error();
        }
        // Check if user is an admin
        const isAdmin = user.role === 'admin';
        // If user is not an admin, throw an error
        if (!isAdmin) {
            throw new Error();
        }
        // Add token and user to request object and pass control to next middleware
        req.token = token;
        req.admin = user;
        next();
    }
    catch (error) {
        // If any errors occur during verification, send a 401 Unauthorized response
        res.status(401).send({ error: 'Unauthorized access' });
    }
});
exports.default = adminAuth;
