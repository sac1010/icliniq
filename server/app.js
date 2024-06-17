// app.js
import express from "express";
import taskRoutes from "./routes/task.js";
import { sequelize } from "./models/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
