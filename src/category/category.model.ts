import { model, Document, Schema } from "mongoose"
import autopopulate from "mongoose-autopopulate"
import userModel, { IUser } from "../user/user.model"
export interface ICategory extends Document {
  title: string
  createdBy: IUser | string
}

const schema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
    autopopulate: true,
    requried: true,
  },
}, {
  timestamps: true
})

schema.plugin(autopopulate)

export default model<ICategory>("Category", schema)