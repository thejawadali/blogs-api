import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"


export const errorChecker = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array().map((err) => err.msg))
  }
  next()
}