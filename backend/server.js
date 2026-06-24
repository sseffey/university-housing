import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();


app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/applications", applicationRoutes);




const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    
  }
};

const port = process.env.PORT || 3000;
startServer();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
