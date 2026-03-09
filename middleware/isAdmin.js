const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { ServerError, ValidError } = require('../service/validation')
const isAdmin = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization.split(" ")[1]
        if(!authToken){
            return ValidError(res, 401, "Token kiritilmagan!")
        }
        const decoded = jwt.verify(authToken, process.env.SECRET_KEY)

        const user = await User.findOne({where: {id: decoded.id}, raw: true})

        if(!user){
            return ValidError(res, 404, "Foydalanuvchi topilmadi!")
        }
        if(user.role !== "superuser"){
            return res.status(403).json({
                message: "Sizga bu mumkin emas"
            })
        }
        const {password, ...userWithoutPassword} = user
        req.user = userWithoutPassword
        next()
    } catch (error) {
        ServerError(res, error)
    }
}
module.exports = {isAdmin}