import { Document } from "mongoose";

interface IRoomTypes extends Document {
    name: "Single" | "Double" | "Triple" | "Quad" | "Queen" | "King" | "Twin";
    description?: string;
  }

  export default IRoomTypes;