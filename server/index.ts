import express from "express";
import { config } from "dotenv";
import connectDB from "./utils/dbConnect";
import urlRouter from "./route/url";
import userRouter from "./route/user";

config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`-> ${req.method} ${req.path}`);
  next();
  console.log(`<- ${res.statusCode}`);
});

app.use("/", userRouter);
app.use("/", urlRouter);

app.listen(PORT, () => {
  connectDB()
    .then((_conn) => {
      console.log("Connected to DB");
      console.log(`Server running on port ${PORT}`);
    })
    .catch((err) => console.log(err));
});
