import express from "express";
import Bid from "../Models/Bid.js"

const router = express.Router()

// Just for check
// router.get('/', (req,res)=> console.log('Yes, i am from bid'))

router.get('/', async (req, res)=>{
  try{

    const data = await Bid.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.status(200).json(data)
  } catch(error){
    res.status(400).json({message: error})
  }
  // console.log(data)
})

export default router;