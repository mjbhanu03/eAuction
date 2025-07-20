import express from "express"
import User from "../Models/User.js"

const router = express.Router()

router.post('/register', async (req, res) => {
  try{
    const {name, email, password} = req.body

    const existing = await User.findOne({email})
    if (existing) return res.status(400).json({ message: "User already exist" })
  
    const user = new User({name, email, password})  
    await user.save()
    console.log(req.body)
    res.status(201).json({message: 'User created succesfully!'})
    } catch(error){
      res.status(500).json({message: 'Sorry, Server error'})
      console.error("❌ Backend Error:", error);
    }
})

export default router;