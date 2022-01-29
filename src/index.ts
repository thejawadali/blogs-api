import express, { Request, Response } from "express"
require("dotenv").config()

const app = express()

const port = process.env.PORT || 3000


app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "jawad ali",
    age: 25,
    skills: "Ala"
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})