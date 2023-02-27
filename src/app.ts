import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import constants from "./utils/constants";
import Controller from "./controllers/controller";
import database from "./configs/database";
import { number, string } from "joi";

const app = express();
const { MESSAGES } = constants;

app.use(cors({ origin: "*" }));
app.use(express.json());
database();

const PORT = process.env.PORT || 5000;

// base API
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});

// fetch all rooms
app.get("/api/v1/rooms", async (req: Request, res: Response) => {
  try {
    const rooms = await Controller.getAllRooms();
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: rooms });
  } catch (err: any) {
    res
      .status(500)
      .send({ message: err?.message || MESSAGES.ERROR, success: false });
  }
});

// fetch a particular room by Id
app.get("/api/v1/room/:id", async (req: Request, res: Response) => {
  try {
    const room = await Controller.getRoomById(req.params.id);
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: room });
  } catch (err: any) {
    res
      .status(500)
      .send({ message: err?.message || MESSAGES.ERROR, success: false });
  }
});

// fetch a room by search or filter
app.get("/api/v1/room-search", async (req: Request, res: Response) => {
  let roomName: string | undefined = req.query.roomName?.toString();
  let roomType: string | undefined = req.query.roomType?.toString();
  let maxPrice: number | undefined = Number(req.query.minPrice);
  let minPrice: number | undefined = Number(req.query.minPrice);

  if (!roomName) {
    roomName = "";
  }

  if (!roomType) {
    roomType = "";
  }

  if (!maxPrice) {
    maxPrice = 400000;
  }

  if (!minPrice) {
    minPrice = 0;
  }

  try {
    const room = await Controller.findRoom(
      roomName,
      roomType,
      maxPrice,
      minPrice
    );
    res.status(200).send({ message: MESSAGES.FETCHED, success: true, room });
  } catch (err: any) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch all room_types
app.get("/api/v1/room-types", async (req: Request, res: Response) => {
  try {
    const roomTypes = await Controller.getAllRoomTypes();
    res
      .status(200)
      .send({ message: MESSAGES.FETCHED, success: true, data: roomTypes });
  } catch (err: any) {
    res
      .status(500)
      .send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

// fetch a particular room-type by Id
app.get("/api/v1/room-type/:id", async (req: Request, res: Response) => {
    try {
      const roomType = await Controller.getRoomTypeById(req.params.id);
      res
        .status(200)
        .send({ message: MESSAGES.FETCHED, success: true, data: roomType });
    } catch (err: any) {
      res
        .status(500)
        .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
  });
  
  // create room
  app.post("/api/v1/room", async (req: Request, res: Response) => {
    const { name, room_type, price } = req.body;
    try {
      if (!name || !price || !room_type)
        throw new Error("Please provide all the required fields");
      const data = await Controller.addRoom(name, price, room_type);
      res.status(201).send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err: any) {
      res
        .status(501)
        .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
  });
  
  // create room_type
  app.post("/api/v1/room_type", async (req: Request, res: Response) => {
    try {
      const data = await Controller.addRoomType(req.body);
      res.status(201).send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err: any) {
      res
        .status(501)
        .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
  });
  
  // edit room
  app.patch("/api/v1/room/:roomId", async (req: Request, res: Response) => {
    try {
      const { roomId } = req.params;
      const body = req.body;
  
      const data = await Controller.editRoomById(roomId, body);
      res.status(201).send({ message: MESSAGES.UPDATED, success: true, data });
    } catch (err: any) {
      res
        .status(501)
        .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
  });
  
  // edit room_type
  app.patch("/api/v1/room-type/:roomTypeId", async (req: Request, res: Response) => {
    try {
      const { roomTypeId } = req.params;
      const body = req.body;
  
      const data = await Controller.editRoomTypeById(roomTypeId, body);
      res.status(201).send({ message: MESSAGES.UPDATED, success: true, data });
    } catch (err: any) {
      res
        .status(501)
        .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
  });
  
  // To delete room
  app.delete("/api/v1/room/:roomId", async (req: Request, res: Response) => {
    try {
      const { roomId } = req.params;
  
      const data = await Controller.deleteRoomById(roomId);
      res.status(200).send({ message: MESSAGES.DELETED, success: true, data });
    } catch (err: any) {
      res
        .status(500)
        .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
  });
  
  // To delete room_type
app.delete("/api/v1/room-types/:roomTypeId", async (req: Request, res: Response) => {
  try {
    const { roomTypeId } = req.params;
    const data = await Controller.deleteRoomTypeById(roomTypeId);
    res.status(200).send({ message: MESSAGES.DELETED, success: true, data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || MESSAGES.ERROR, success: false });
  }
});

app.listen(PORT, () => {

  // To start up the server
  console.log(`Server started on PORT: ${PORT}`);
});

export default app;
