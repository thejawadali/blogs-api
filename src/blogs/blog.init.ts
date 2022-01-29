import categoryModel from "../category/category.model"
import userModel from "../user/user.model"
import blogModel, { IBlog } from "./blog.model"

export default async () => {
  if (await blogModel.countDocuments() > 0) return

  const user = await userModel.findOne()
  if (!user) {
    console.warn("no user found")
    return
  }

  const category = await categoryModel.findOne()
  if (!category) {
    console.warn("No Category found")
    return
  }

  blogModel.create({
    title: "Aut accusantium dolor totam impedit placeat.",
    author: user._id,
    category: category._id,
    initialParagraph: `Laudantium ullam vero. Dolores eum vitae quisquam natus. Ipsam omnis culpa consequatur distinctio.`,
    details: `Quam vel blanditiis velit facilis laboriosam facere ea. Alias ea et. At harum vel nihil unde reiciendis. Et qui et error.
 
          Odit qui eveniet modi libero laudantium. Eos quia repellat sunt perspiciatis cumque corporis nihil voluptatem quia. Ut voluptatem natus voluptatum quia voluptatem aut aliquam ducimus. Accusamus sint alias aliquam earum expedita. Voluptatibus assumenda ut dolor.
 
Ut laborum exercitationem velit. Consequatur aliquid omnis nobis temporibus est itaque velit vel. Expedita possimus amet odit debitis est nulla cumque ratione animi. Aut consequatur sit ab quasi reprehenderit ea magni. Consequuntur perspiciatis omnis.`
  } as unknown as IBlog)
}