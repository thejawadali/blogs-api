import { model, Document, Schema } from "mongoose"
import categoryModel, { ICategory } from "../category/category.model"
import userModel, { IUser } from "../user/user.model"



export interface IComment extends Document {
  user: IUser | string
  statement: string
}

const commentSchema = new Schema({
  statement: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
    autopopulate: {
      select: "name profilePic"
    },
    requried: true,
  }
}, { timestamps: true })

export interface IBlog extends Document {
  title: string
  author: IUser | string
  category: ICategory | string
  image?: string
  initialParagraph: string
  details: string
  comments?: IComment[]
  likes: number
}

const schema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
    autopopulate: {
      select: "-password"
    },
    requried: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: categoryModel.modelName,
    autopopulate: true,
    requried: true,
  },
  image: {
    type: String,
    default: ""
  },
  details: {
    type: String,
    default: ""
  },
  comments: {
    type: [commentSchema],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  initialParagraph: {
    type: String,
    requried: true
  },

}, {
  timestamps: true
})


export default model<IBlog>("Blog", schema)