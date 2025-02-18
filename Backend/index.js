import express from "express";
import DatabaseConnection from "./database/db.js";
import "dotenv/config";
import Router from "./routes/route.js";
import cors from "cors";

const app = express();

const PORT = 8000;

DatabaseConnection(process.env.DB_USERNAME, process.env.DB_PASSWORD);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", Router);

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
