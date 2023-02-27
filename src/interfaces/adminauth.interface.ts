import { Request } from "express";
import { Admin } from "mongodb";
import IUser from "./user.interface";

interface Authenticate extends Request {
    admin: IUser & { _id: import("mongoose").Types.ObjectId; };
    token?: string;
    User?: Admin;
  }

  export default Authenticate;