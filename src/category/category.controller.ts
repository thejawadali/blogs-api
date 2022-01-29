import { Router } from "express"
import { body, param } from "express-validator"
import { Authorize } from "../core/authorization"
import { errorChecker } from "../core/middlewares"
import categoryModel from "./category.model"

const router = Router()

// create new category
router.post("/", Authorize,
  [
    body("title", "title of category is required").exists().isString()
  ], errorChecker,
  async (req: any, res: any) => {
    // verify that not more than one category can have same names
    const title = (req.body.title as string).toLowerCase()
    if (await categoryModel.findOne({
      title
    })) {
      return res.status(400).send("Category already exists")
    }
    const category = new categoryModel({
      title,
      createdBy: req.user._id
    })
    await category.save()
    res.status(201).json(category)
  })

// get all categories
router.get("/", async (_req: any, res:any) => {
  const categories = await categoryModel.find()
  res.status(200).json(categories)
})

// get single category
router.get("/:categoryId",
  [
    param("categoryId", "A valid category id is required.").exists().isMongoId()
  ], errorChecker,
  async (req: any, res: any) => {
    const category = await categoryModel.findOne({
      _id: req.params.categoryId
    })
    if (!category) {
      return res.status(400).send("No category found")
    }
    res.status(200).json(category)
  })

export default router