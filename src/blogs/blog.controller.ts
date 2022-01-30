import { Router } from "express"
import { body, param } from "express-validator"
import { orderBy } from "lodash"
import categoryModel from "../category/category.model"
import { Authorize } from "../core/authorization"
import { uploadSingle } from "../core/fileUploader"
import { errorChecker } from "../core/middlewares"
import blogModel, { IBlog, IComment } from "./blog.model"
const router = Router()


router.post("/", Authorize, uploadSingle("image"),
  [
    body("categoryId", "A valid category required").exists().isMongoId(),
    body("title", "title is required").exists().isString(),
    body("initialParagraph", "Starter paragraph is required").exists().isString()
  ], errorChecker,
  async (req: any, res: any) => {
    const category = await categoryModel.findOne({
      _id: req.body.categoryId
    })
    if (!category) {
      return res.status(400).send("Category Not Found")
    }
    const blog = new blogModel({
      title: req.body.title,
      author: req.user._id,
      category: req.body.categoryId,
      image: req.file ? "images/" + req.file.filename : "",
      initialParagraph: req.body.initialParagraph,
      details: req.body.details
    } as unknown as IBlog)
    await blog.save()
    res.json(blog)
  })

router.get("/", async (_req: any, res: any) => {
  const blogs = await blogModel.find()
  res.status(200).json(orderBy(blogs, "createdAt", "desc"))
})

router.get("/:blogId",
  [
    param("blogId", "Invalid blog id").exists().isMongoId()
  ], errorChecker,
  async (req: any, res: any) => {
    const blog = await blogModel.findOne({
      _id: req.params.blogId
    })
    if (!blog) {
      return res.status(400).send("No blog found")
    }
    res.status(200).json(blog)
  })

router.put("/:blogId", uploadSingle("image"),
  [
    param("blogId", "Invalid blog id").exists().isMongoId(),
    param("categoryId", "Invalid category id").optional().isMongoId(),

  ],
  Authorize,
  errorChecker,
  async (req: any, res: any) => {
    const blog = await blogModel.findOne({
      _id: req.params.blogId,
      author: req.user._id
    })
    if (!blog) {
      return res.status(400).send("No blog found")
    }

    console.log(req.body.title)


    blog.set({
      title: req.body.title || blog.title,
      category: req.body.categoryId || blog.category,
      image: req.file ? "images/" + req.file.filename : blog.image,
      details: req.body.details || blog.details
    } as IBlog)

    await blog.save()

    res.status(200).json(blog)
  })

router.delete("/:blogId",
  [
    param("blogId", "Invalid blog id").exists().isMongoId()
  ], Authorize,
  errorChecker,
  async (req: any, res: any) => {
    const blog = await blogModel.findOne({
      _id: req.params.blogId,
      author: req.user._id
    })
    if (!blog) {
      return res.status(400).send("No blog found")
    }
    await blogModel.deleteOne({
      _id: req.params.blogId
    })
    res.status(200).send("Deleted Successfully")
  })

router.post("/:blogId/comment",
  [
    param("blogId", "Invalid blog id").exists().isMongoId(),
    body("comment", "Comment statement is required").exists().isString()
  ], Authorize,
  errorChecker,
  async (req: any, res: any) => {
    const blog = await blogModel.findOne({
      _id: req.params.blogId
    })
    if (!blog) {
      return res.status(400).send("No blog found")
    }

    blog.comments?.push({
      user: req.user._id,
      statement: req.body.comment
    } as IComment)

    await blog.save()

    res.status(200).json(blog)
  })

router.post("/:blogId/like",
  [
    param("blogId", "Invalid blog id").exists().isMongoId()
  ], Authorize,
  errorChecker,
  async (req: any, res: any) => {
    const blog = await blogModel.findOne({
      _id: req.params.blogId
    })
    if (!blog) {
      return res.status(400).send("No blog found")
    }

    (blog.likes as number)++

    await blog.save()

    res.status(200).json(blog)
  })



export default router
