import crypto from "crypto"
require("dotenv").config()

const secret = process.env.SECRET || "abc"
export function hashPassword(value: string) {
  return value ?
  crypto
  .createHmac("sha512", secret)
  .update(value, "utf8")
  .digest("hex")
    : void 0
}