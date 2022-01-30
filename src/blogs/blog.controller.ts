import { Router } from "express"
import { body, param } from "express-validator"
import { orderBy } from "lodash";
import { Authorize } from "../core/authorization"
import { errorChecker } from "../core/middlewares"
import blogModel, { IComment } from "./blog.model"
const router = Router()

// TODO create blog call

router.get("/", async (_req: any, res:any) => {
  const blogs = await blogModel.find()
  res.status(200).json(orderBy(blogs, "createdAt", "desc"))
})

router.get("/:blogId",
  [
    param("blogId", "Invalid blog id").exists().isMongoId()
  ], errorChecker,
  async (req: any, res:any) => {
    const blog = await blogModel.findOne({
      _id: req.params.blogId
    })
    if (!blog) {
      return res.status(400).send("No blog found")
    }
    res.status(200).json(blog)
  })

// Update blog call

router.delete("/:blogId",
  [
    param("blogId", "Invalid blog id").exists().isMongoId()
  ], Authorize,
  errorChecker,
  async (req: any, res:any) => {
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
  async (req: any, res:any) => {
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
  async (req: any, res:any) => {
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
