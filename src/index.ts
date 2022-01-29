import express, { Request, Response } from "express"
import bodyParser from "body-parser";
require("dotenv").config()

const app = express()

app.use(bodyParser.json())


app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "jawad ali",
    age: 25,
    skills: "Ala"
  })
})

app.post("/",(req:any, res: Response) => {
  res.json(req.body)
})



// start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})