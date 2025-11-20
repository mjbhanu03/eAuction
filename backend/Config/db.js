  import { Sequelize } from "sequelize"

  const db = new Sequelize("eauction", "root", "", {
    host: "localhost",
    dialect: "mysql",
  }) 

  db.authenticate()
  .then(()=> console.log("MySQL Connected"))
  .catch((err) => console.log("Error: "+err))

  export default db