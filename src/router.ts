import { Router } from "express";
import authController from "./user/auth.controller"
import cateController from "./category/category.controller"
const baseRouter = Router()

baseRouter.use("/auth", authController)
baseRouter.use("/categories", cateController)

export default baseRouter