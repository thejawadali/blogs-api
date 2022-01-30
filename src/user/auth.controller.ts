import { Router } from "express"
import { body } from "express-validator"
import { Authorize, JWT } from "../core/authorization"
import { hashPassword } from "../core/crypt"
import { uploadSingle } from "../core/fileUploader"
import { errorChecker, uniqueUser } from "../core/middlewares"
import userModel, { IUser } from "./user.model"


const router = Router()

router.post("/register", uploadSingle("profilePic"),
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
      profilePic: req.file ? "images/"+req.file.filename : ""
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

// user login
router.post("/login",
  [
    body("email", "unique email is required").exists(),
    body("password").exists().isLength({
      min: 8,
      max: 32
    })
  ], errorChecker,
  async (req: any, res: any) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email,
        password: hashPassword(req.body.password)
      })
      if (!user) {
        return res.status(400).send("No user found with given credentials")
      }

      const token = JWT({
        _a: user._id,
        _b: user.email
      })


      res.json({
        user: {
          ...user.toJSON(),
          password: undefined
        },
        token
      })
    } catch (error) {
      res.json(error)
    }
  })

router.get("/me", Authorize, (req: any, res: any)=> {
  res.json({
    ...req.user.toJSON(),
    password: undefined
  })
})

export default router