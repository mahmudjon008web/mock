const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { ServerError, ValidError } = require('../service/validation')
const protect = async (req, res, next) => {
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
        const {password, ...userWithoutPassword} = user
        req.user = userWithoutPassword
        next()
    } catch (error) {
        ServerError(res, error)
    }
}
module.exports = {protect}