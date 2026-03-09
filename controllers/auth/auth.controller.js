const db = require('../../models');
const hashPassword = require('../../service/hashPassword');
const { ServerError, ValidError } = require('../../service/validation');
const User = db.User;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const {username, password, phone } = req.body

        const existUser = await User.findOne({where: {phone}})
        if(existUser){
            return ValidError(res, 401, "Bunday foydalanuvchi oldindan mavjud edi!")
        }
        const user = await User.create({
            username,
            password: await hashPassword(password, 10),
            phone
        })
        res.status(201).json({
            message: "Foydalanuvchi muvaffaqiyatli yaratildi!",
            user
        })
    } catch (error) {
        console.log(error);
        
        ServerError(res, error)
    }
}


const login = async (req, res)=>{
    try {
        const {password, phone} = req.body
        const user = await User.findOne({where: {phone}})
        if(!user){
            return ValidError(res, 400, "Parol yoki Foydalanuvchi xato!")
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return ValidError(res, 400, "Parol yoki Foydalanuvchi xato!")
        }
        const token = jwt.sign(
            {
                id: user.id,
                phone: user.phone,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );
        await User.update({
            isLogged: true
        },
        {
            where: {id: user.id}
        })
        res.status(200).json({
            message: "Akkauntga kirildi!",
            token
        })
    } catch (error) {
        ServerError(res, error)
    }
}

const logout = async (req, res)=>{
    try {
        const user = req.user
        await User.update({
            isLogged: false
        })
    } catch (error) {
        ServerError(res, error)
    }
}


module.exports = {
    register,
    login,
    logout
}