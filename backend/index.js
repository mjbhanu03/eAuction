import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./Routes/authRoutes.js"
import db from "./Config/db.js"
import cookieParser from "cookie-parser"

dotenv.config();
// db();


const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT, ()=>
  console.log(`Server running on port ${PORT}`)
)
app.use("/auth", authRoutes)
app.get("/", async (req, res) => {
  try {
    const [results, metadata] = await db.query("SELECT * FROM regions");
    res.json(results);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
