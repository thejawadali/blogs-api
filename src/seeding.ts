import userInit from "./user/user.init";
import cateInit from "./category/category.init";
import blogInit from "./blogs/blog.init";

export default async function() {
  await userInit()
  await cateInit()
  await blogInit()
}