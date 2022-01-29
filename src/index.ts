import bodyParser from "body-parser"
import express from "express"
import seeding from "./seeding";
import router from "./router";
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

  // data seeding
  seeding()
  app.use(router)
  // start server after connection with db
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
})