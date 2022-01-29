import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
require("dotenv").config()

const app = express()

app.use(bodyParser.json())


// connect to db
const dbURL = process.env.DB_CONNECTION || ""
mongoose.connect(dbURL, {
  autoIndex: true
}).then(() => {
  console.log("DB Connected")

  
  // start server after connection with db
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
})