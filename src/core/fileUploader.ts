import { existsSync, mkdirSync } from "fs"
import multer from "multer"
import path from "path"
import { imageFilter } from "./validator"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // see if its image file, create image folder in uploads folder
    const isImageFile = path.extname(file.originalname).match(/\.(jpg|jpeg|png|gif)$/i)
    // see if its vidoe file, create image folder in uploads folder
    const isVideoFile = path.extname(file.originalname).match(/\.(mp4|mov)$/i)
    const folderDestination = path.join(__dirname, `/../../public/uploads/${isImageFile ? "images" : isVideoFile ? "videos" : "documents"}`)
    // see if that folder does not exists, create one
    if (!existsSync(folderDestination)) {
      mkdirSync(folderDestination, { recursive: true })
    }
    cb(null, folderDestination)
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1]
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
  }
})


export const upload = (validatorFn:any) => {
  return multer({
    // set destination
    dest: path.join(__dirname, "/../../public/uploads/"),
    limits: {
      fileSize: 25 * 1024 * 1024 // 25mb
    },
    storage,
    fileFilter: validatorFn
  })
}

export function uploadSingle(fileName: any, validator = imageFilter){return upload(validator).single(fileName)}
export function uploadMultiple(fileName: any, maxNoOfAttachments: number, validator= imageFilter){return upload(validator).array(fileName, maxNoOfAttachments)}