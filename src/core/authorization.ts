import jwt from "jsonwebtoken";
require("dotenv").config()

const secret = process.env.SECRET || "abc"


export function JWT(userObj: object) {
  return jwt.sign(userObj, secret, {
    algorithm: "HS512",
    expiresIn: "1d"
  })
}