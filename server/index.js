import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

import userRoutes from "./routes/user.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 8000;
const CONNECT_URI = process.env.MONGO_DB_URL;

mongoose
  .connect(CONNECT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Listening on port: ", PORT);
  })
  .catch((error) => console.log("Cannot connect to Sercer: ", error));

// mongoose.set("useFindAndModify", false);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("This is Homepage...");
});
