import { Model } from "mongoose";
import IUser from "./user.interface";

interface IUserModel extends Model<IUser> {
    findByCredentials: (email: string, password: string) => Promise<IUser>;
  }

  export default IUserModel