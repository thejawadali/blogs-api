import { Router } from "express"
import { body } from "express-validator"
import { JWT } from "../core/authorization"
import { hashPassword } from "../core/crypt"
import { errorChecker, uniqueUser } from "../core/middlewares"
import userModel, { IUser } from "./user.model"

const router = Router()

router.post("/register",
  [
    body("name", "Name is required").exists(),
    body("email", "Enter valid email").isEmail().exists(),
    body("password").exists().isLength({
      min: 8,
      max: 32
    })
  ], errorChecker, uniqueUser, async (req: any, res: any) => {

    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      statusText: req.body.statusText,
      profilePic: req.file ? req.file.path : ""
    } as unknown as IUser)

    await newUser.save()

    const token = JWT({
      _a: newUser._id,
      _b: newUser.email
    })

    res.json({
      user: {
        ...newUser.toJSON(),
        password: undefined
      },
      token
    })
  })

export default router