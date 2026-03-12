const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, "../public/audios"))
  },
  filename: function(req, file, cb){
    cb(null, "audio-" + Date.now() + path.extname(file.originalname))
  }
})

const uploadAudio = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024 // 30MB
  },
  fileFilter: (req, file, cb) => {
    // 1. Faqat kengaytmalarni tekshiramiz
    const allowedExts = [".mp3", ".wav", ".ogg", ".m4a", ".mpeg"];
    const ext = path.extname(file.originalname).toLowerCase();

    // 2. Mime-typelarni kengroq qamrab olamiz
    const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/x-m4a", "audio/mp3"];

    if (allowedExts.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // Bu yerda xatoni aniqroq ko'rsatish uchun file.mimetype ni ham chiqaring
      cb(new Error(`Faqat audio yuklash mumkin! Siz yuborgan format: ${file.mimetype}`), false);
    }
  }
});

module.exports = uploadAudio