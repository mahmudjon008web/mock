const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const filetype = /png|jpg|svg|jpeg|webp|avif/
        const extname = filetype.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetype.test(file.mimetype)

        if (extname && mimetype) {
            return cb(null, true)
        } else {
            return cb(new Error("Siz faqat 5mb gacha rasm kirita olasiz!"))
        }
    }
})

module.exports = upload