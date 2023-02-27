import mongoose from "mongoose";
import constants from "../utils/constants";

function database(): void {
  console.log("connecting to Mongodb...");
  // console.log(constants.DATABASE_URI);
  mongoose
    .set("strictQuery", true)
    .connect(constants.DATABASE_URI!, {})
    .then(() => {
      console.log("yes, mongodb is connected.");
    })
    .catch((error: Error) => {
      console.log(error);
    });
}

export default database;

