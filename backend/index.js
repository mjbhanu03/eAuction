import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./Routes/authRoutes.js"
import connectDB from "./Config/db.js"

dotenv.config();
connectDB();


const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

const PORT = process.env.PORT || 5000



app.listen(process.env.PORT, ()=>
  console.log(`Server running on port ${PORT}`)
)
app.use("/auth", authRoutes)
app.get("/", (req, res) => {
  res.send("API is running...");
});