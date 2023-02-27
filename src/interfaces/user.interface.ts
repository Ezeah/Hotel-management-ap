import { Document, Model } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    tokens: { token: string }[];
    generateAuthToken: () => Promise<string>;
  }
  
  interface IUserModel extends Model<IUser> {
    findByCredentials: (email: string, password: string) => Promise<IUser>;
  }

  export default IUser
  
  