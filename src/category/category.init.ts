import userModel from "../user/user.model"
import categoryModel, { ICategory } from "./category.model"

export default async () => {
  if (await categoryModel.countDocuments() > 0) return
  const user = await userModel.findOne()
  if (!user) {
    console.warn("No User Found")
    return
  }
  categoryModel.create({
      title: "geography",
      createdBy: user._id
    } as unknown as ICategory)
}

