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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            const isValidUsername = validator_1.default.isAlphanumeric(value);
            if (!isValidUsername) {
                const errorMessage = "Username is invalid";
                throw new Error(errorMessage);
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            const isValidEmail = validator_1.default.isEmail(value);
            if (!isValidEmail) {
                const errorMessage = "Email is invalid";
                throw new Error(errorMessage);
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'");
            }
        },
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum: ["guest", "admin"],
        default: "guest",
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });
userSchema.statics.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ email });
        if (!user) {
            throw new Error("Unable to login");
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Unable to login");
        }
        return user;
    });
};
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, "alabaster");
        user.tokens.push({ token });
        yield user.save();
        return token;
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcryptjs_1.default.hash(user.password, 8);
        }
        next();
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
