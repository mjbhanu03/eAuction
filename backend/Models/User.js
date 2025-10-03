import { DataTypes } from "sequelize";
import db from "../Config/db.js";

const User = db.define("users",{
  name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  surname:{
    type: DataTypes.STRING,
    allowNull: false
  },
  number:{
    type: DataTypes.BIGINT,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  document_type:{
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING,
    allowNull: false
  },
  city_id:{
    type: DataTypes.NUMBER,
    allowNull: false
  }
})

export default User