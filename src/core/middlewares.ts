import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import userModel from "../user/user.model"


export const errorChecker = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array().map((err) => err.msg))
  }
  next()
}

export const uniqueUser = async (req: any, res: Response, next: NextFunction) => {
  const user = await userModel.findOne({
    email: req.body.email
  })
  if (user) {
    return res.status(400).send("User Already Exists with that Email")
  }
  next()
}