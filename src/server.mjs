import dotenv from "dotenv";
dotenv.config(); // Load .env file


import app from "./express.js"; // Import your Express app
import mongoose from "mongoose"; // Import mongoose for database connection
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const port = process.env.PORT || 3000;

const dbUri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.hex2mmr.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(
        `Node API is running on port ${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });