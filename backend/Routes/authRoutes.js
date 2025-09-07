import express from "express"
import User from "../Models/User.js"
import bcrypt from "bcryptjs"
import verifyJWT from "../Middleware/authMiddleware.js"
import jwt from "jsonwebtoken"
const router = express.Router()

router.post('/register', async (req, res) => {
  try{
    const {name, email, password} = req.body

    const existing = await User.findOne({email})
    if (existing) return res.status(400).json({ message: "User already exist" })
      else{
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({name, email, password: hashedPassword})  
    await user.save()

    console.log(req.body)
    return res.status(201).json({message: 'User created succesfully!'})
  }
  } catch(error){
    console.error("Backend Error:", error);
    return res.status(500).json({message: 'Sorry, Server error'})
  }
})

router.post('/login', async (req, res) => {
  try{
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user) return res.status(400).json({message: "User not found!"})

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: "Invalid Credentials"})

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    })
    res.json({message: "Login successful", user: {name: user.name, email: user.email}})

  }catch(error){
    res.status(500).json({message: 'Sorry, server error'})
    console.log(error)
  }
})

router.post("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({message: "Logged out successfully"})
})

router.get("/profile", verifyJWT, async (req, res) => {
try{
  const user = await User.findById(req.user.id).select('-password')
  res.json({ success: true, user })
} catch (error){
  res.status(500).json({success: false, message: "Failed to load profile.."})
}
})

export default router;