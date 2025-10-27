import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import bidRoutes from "./Routes/bidRoutes.js"
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

// Initialize express app
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.resolve();


// Serve static profile images from the backend's Photos/Profile folder
app.use('/photos/profile', express.static(path.join(__dirname, 'Photos')));

// Use your auth routes
app.use("/auth", authRoutes);

// Bid Routes
app.use("/bid", bidRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
