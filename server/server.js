import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();         
connectDB();           

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/pets", petRoutes);

//  Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});


//  Server start
const PORT = process.env.PORT || 5000;

app.listen(5000, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});