import { Document, Schema } from "mongoose";

interface IRoom extends Document {
    name: string;
    room_type: Schema.Types.ObjectId;
    price: number;
  }    

  export default IRoom;