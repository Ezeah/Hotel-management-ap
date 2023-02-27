import { model, Model, Schema } from "mongoose";
import IRoom from "../interfaces/room.interface";
import constants from "../utils/constants";
const { DATABASES } = constants;

const RoomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    room_type: {
      type: Schema.Types.ObjectId,
      ref: "room_type",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room: Model<IRoom> = model<IRoom>(DATABASES.ROOM, RoomSchema);

export default Room;

