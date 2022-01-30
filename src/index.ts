import bodyParser from "body-parser"
import "express-async-errors"
import express from "express"
import seeding from "./seeding"
import router from "./router"
import mongoose from "mongoose"
require("dotenv").config()

const app = express()

app.use(bodyParser.json())
app.use("/", express.static(__dirname + "/../public/uploads"))

// connect to db
const dbURL = process.env.DB_CONNECTION || ""
mongoose.connect(dbURL, {
  autoIndex: true
}).then(() => {
  console.log("DB Connected")

  // data seeding
  seeding()
  app.use(router)



  // error handling
  app.use("/", (req: any, res: any) => {
    res.status(400).json({ error: "Requested path not found on server" })
  })

  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err)

    err.statusCode = err.statusCode || 500
    res.status(err.statusCode).json({
      error: err.message || "Server Error"
    })
  })

  // start server after connection with db
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
})