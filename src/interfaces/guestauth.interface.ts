import { Request } from "express";
import User from "../models/user.model";
import IUser from "./user.interface";

interface AuthenticatedRequest extends Request {
    token?: string;
    guest?: IUser;
}

export default AuthenticatedRequest
