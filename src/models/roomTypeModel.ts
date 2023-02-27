import { model, Model, Schema } from "mongoose";
import IRoomTypes from "../interfaces/roomtype.interface";
import constants from "../utils/constants";
const { DATABASES } = constants;

const RoomTypesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Single", "Double", "Triple", "Quad", "Queen", "King", "Twin"],
  },
  description: {
    type: String,
    required: false,
  },
});

const RoomTypes: Model<IRoomTypes> = model<IRoomTypes>(
  DATABASES.ROOM_TYPES,
  RoomTypesSchema
);

export default RoomTypes;

