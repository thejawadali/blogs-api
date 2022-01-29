import { Router } from "express";

const router = Router()

router.post("/register", (req: any, res: any)=> {
  res.json(req.body)
})

export default router