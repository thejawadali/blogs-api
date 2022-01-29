import userInit from "./user/user.init";
import cateInit from "./category/category.init";

export default async function() {
  await userInit()
  await cateInit()
}