import { Router } from "express"
import { body } from "express-validator"
import { errorChecker } from "../core/middlewares"

const router = Router()

router.post("/register",
[
  body("name", "Name is required").exists(),
  body("email", "Must be a valid email").isEmail().exists(),
  body("password", "Password must be 8 characters long").isLength({ min: 8, max: 32 }).exists()
], errorChecker,
  (req: any, res: any) => {
    res.json(req.body)
  })

export default router