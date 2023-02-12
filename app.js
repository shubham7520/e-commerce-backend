import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
const app = express();
config();
dbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("api is working");
});

app.use("/api", userRoute);
app.use("/api", productRoute);
const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`listening on http://localhost:${port}`);
});
