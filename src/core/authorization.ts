import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import userModel from "../user/user.model"
require("dotenv").config()

const secret = process.env.SECRET || "abc"


export function JWT(userObj: object) {
  return jwt.sign(userObj, secret, {
    algorithm: "HS512",
    expiresIn: "1d"
  })
}

export const Authorize = async (req: any, res: Response, next: NextFunction) => {
  const token: string = req.header("Authorization") || ""
  if (!token) {
    return res.status(400).send("Authorization Token is required for this request")
  }
  await jwt.verify(token, secret, { algorithms: ["HS512"] }, async (err, doc: any) => {
    if (err) {
      return res.status(401).json(err)
    }
    // get user
    const user = await userModel.findOne({
      _id: doc._a,
      email: doc._b
    })
    req.user = user
    next()
  })
}