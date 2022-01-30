import { NextFunction, Request, Response } from "express"



export const imageFilter = (req: any, file: any, cb: any) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false)
  }
  cb(null, true)
}