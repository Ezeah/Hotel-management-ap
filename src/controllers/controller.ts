import Room from "../models/roomModel";
import Room_Types from "../models/roomTypeModel";

class Controller {
  async getAllRooms() {
    return await Room.find();
  }

  async addRoom(name: string, price: number, room_type: string) {
    const newRoom = {
      name,
      price,
      room_type,
    };
    return await new Room(newRoom).save();
  }

  async getRoomById(id: string) {
    return await Room.findOne({ _id: id });
  }

  async findRoom(roomName: string, roomType: string, maxPrice: number, minPrice: number) {
    return await Room.find()
      .and([
        {
          $or: [
            { name: roomName },
            { price: { $lt: maxPrice, $gt: minPrice } },
          ],
        },
        {
          $or: [
            { path: "room_type", match: roomType },
            { price: { $lt: maxPrice, $gt: minPrice } },
          ],
        },
      ])
      .populate("room_type");
  }

  async editRoomById(id: string, data: any) {
    return await Room.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteRoomById(id: string) {
    return await Room.findByIdAndDelete({ _id: id });
  }

  async deleteRoomTypeById(id: string) {
    return await Room.findByIdAndDelete({ _id: id });
  }

  async getAllRoomTypes() {
    return await Room_Types.find();
  }

  async addRoomType(room: any) {
    return await Room_Types.create(room);
  }

  async getRoomTypeById(id: string) {
    return await Room_Types.findOne({ _id: id });
  }

  async editRoomTypeById(id: string, data: any) {
    return await Room_Types.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteRoomTypesById(id: string) {
    return await Room_Types.findByIdAndDelete({ _id: id });
  }
}

export default new Controller();
