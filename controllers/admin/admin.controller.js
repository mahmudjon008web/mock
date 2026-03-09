const hashPassword = require("../../service/hashPassword")
const db = require("../../models/index")
const { ServerError, ValidError } = require("../../service/validation")
const User = db.User

const registerAdmin = async ()=>{
    try {
        const existUser = await User.findOne({where: {phone: process.env.ADMIN_PHONE}})
        if(!existUser){
            await User.create({
                username: process.env.ADMIN_NAME,
                password: await hashPassword(process.env.ADMIN_PASS, 10),
                phone: process.env.ADMIN_PHONE,
                role: "superuser"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getUsers = async (req, res)=>{
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        ServerError(res, error)
    }
}

const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params
        const existUser = await User.findOne({where: {id}})
        if(!existUser){
            ValidError(res, 300, "Ma'lumot topilmadi!")
        }
        await User.destroy({where: {id: existUser.id}})
        res.status(201).json({
            message: "Foydalanuvchi muvaffaqiyatli o'chirildi"
        })
    } catch (error) {
        ServerError(res, error)
    }
}

module.exports = {
    registerAdmin,
    deleteUser,
    getUsers
}