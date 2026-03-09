const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, "../public/uploads/audios"))
  },
  filename: function(req, file, cb){
    cb(null, "audio-" + Date.now() + path.extname(file.originalname))
  }
})

const uploadAudio = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024 
  },
  fileFilter: (req, file, cb)=>{
    const types = /mp3|wav|ogg|m4a/
    const ext = types.test(path.extname(file.originalname).toLowerCase())
    const mime = types.test(file.mimetype)

    if(ext && mime){
      cb(null, true)
    } else {
      cb(new Error("Faqat audio yuklash mumkin"))
    }
  }
})

module.exports = uploadAudio