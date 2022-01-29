import { model, Document, Schema } from "mongoose"
export interface IUser extends Document {
  name: string
  email: string
  password: string
  statusText?: string
  profilPic?: string
}

const schema = new Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  statusText: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },

}, {
  timestamps: true
})


export default model<IUser>("User", schema)