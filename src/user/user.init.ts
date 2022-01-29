import userModel, { IUser } from "./user.model"

export default async () => {
  if (await userModel.countDocuments() > 0) return
  userModel.create({
    name: "Jawad Ali",
    email: "ali@ali.com",
    password: "123123123",
    statusText: "Don't Limit yourself"
  } as IUser)
}

