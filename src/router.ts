import { Router } from "express";
import authController from "./user/auth.controller"
const baseRouter = Router()

baseRouter.use("/auth", authController)

export default baseRouter