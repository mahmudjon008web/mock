const { ServerError, ValidError } = require("../../service/validation")
const db = require("../../models/index")
const Writing = db.Writing
const getTasks = async (req, res)=>{
    try {
        const data = await Writing.findAll()
        res.status(200).json(data)
    } catch (error) {
        ServerError(res, error)
    }
}

const getTaskById = async (req, res)=>{
    try {
        const {id} = req.params
        const data = await Writing.findByPk(id)
        if(!data){
            ValidError(res, 404, "Ma'lumot topilmadi")
        }
        res.status(200).json(data)
    } catch (error) {
        ServerError(res, error)
    }
}

const postTasks = async (req, res)=>{
    try {
        const task1_img = `/uploads/${req.file.filename}`
        const {task1_text, task2_text} = req.body
        const newTask = await Writing.create({task1_img, task1_text, task2_text})
        res.status(201).json({
            message: "Muvaffaqiyatli qo'shildi",
            newTask
        })
    } catch (error) {
        ServerError(res, error)
    }
}

const updateTask = async (req, res)=>{
    try {
        const id = req.params
        const task1_img = `/uploads/${req.file.filename}`
        const {task1_text, task2_text} = req.body
        if(!task1_img || !task1_text || !task2_text){
            ValidError(res, 400, "Barcha zonalarni to'ldiring!")
        }
        await Writing.update({task1_img, task1_text, task2_text}, {where: {id}})
        res.status(200).json({
            message: "Muvaffaqiyatli yangilandi!"
        })
    } catch (error) {
        ServerError(res, error)
    }
}

const deleteTask = async (req, res)=>{
    try {
        const {id} = req.params
        const existTask = await Writing.findOne({where: {id}})
        if(!existTask){
            ValidError(res, 204, "Ma'lumot topilmadi!")
        }
        await Writing.destroy({where: {id: existTask.id}})
        res.status(200).json({
            message: "Muvaffaqiyatli o'chirildi"
        })
    } catch (error) {
        ServerError(res, error)
    }
}

module.exports = {
    getTasks,
    getTaskById,
    postTasks,
    updateTask,
    deleteTask
}