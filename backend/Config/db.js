// import mongoose from "mongoose"

// const connectDB = async () => {
  //   try{
    //     await mongoose.connect(process.env.MONGO_URI)
//     console.log("MongoDB Connected")
//   } catch(err){
//     console.error("MongoDB connection failed: ",err)
//     process.exit(1)
//   }
// };

import { Sequelize } from "sequelize"

const db = new Sequelize("eauction", "root", "", {
  host: "localhost",
  dialect: "mysql",
}) 

db.authenticate()
.then(()=> console.log("MySQL Connected"))
.catch((err) => console.log("Error: "+err))

export default db