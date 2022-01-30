import { Router } from "express";
import authController from "./user/auth.controller"
import cateController from "./category/category.controller"
import blogController from "./blogs/blog.controller"
const baseRouter = Router()

baseRouter.use("/auth", authController)
baseRouter.use("/categories", cateController)
baseRouter.use("/blogs", blogController)

export default baseRouter