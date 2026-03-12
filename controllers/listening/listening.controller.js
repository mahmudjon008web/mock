const db = require("../../models/index")
const { ServerError, ValidError } = require("../../service/validation")
const Listening = db.Listening
const listeningPart = db.listeningPart
const listeningOption = db.listeningOption
const listeningQuestion = db.listeningQuestion
const getAllListening = async (req, res) => {
    try {
        const data = await Listening.findAll({
            include: [
                {
                    model: listeningPart,
                    as: "parts",
                    include: [
                        {
                            model: listeningQuestion,
                            as: "questions",
                            include: [
                                {
                                    model: listeningOption,
                                    as: "options"
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [
                ["id", "ASC"],
                [{ model: listeningPart, as: "parts" }, "part_number", "ASC"],
                [{ model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, "id", "ASC"],
                [{ model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, { model: listeningOption, as: "options" }, "id", "ASC"]
            ]
        })

        return res.status(200).json({
            count: data.length,
            data
        })
    } catch (error) {
        ServerError(res, error)
    }
}



const getOneListening = async (req, res) => {
    try {
        const { id } = req.params

        const data = await Listening.findByPk(id, {
            include: [
                {
                    model: listeningPart,
                    as: "parts",
                    include: [
                        {
                            model: listeningQuestion,
                            as: "questions",
                            include: [
                                {
                                    model: listeningOption,
                                    as: "options"
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [
                [{ model: listeningPart, as: "parts" }, "part_number", "ASC"],
                [{ model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, "id", "ASC"],
                [{ model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, { model: listeningOption, as: "options" }, "id", "ASC"]
            ]
        })

        if (!data) {
            ValidError(res, 404, "Listening topilmadi")
        }

        return res.status(200).json({
            data
        })
    } catch (error) {
        ServerError(res, error)
    }
}




const postListening = async (req, res) => {
    try {
        // req.body mavjudligini tekshirish (Multer bilan ba'zan kechikishi mumkin)
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Ma'lumotlar topilmadi (Body is empty)" });
        }

        let { title, parts } = req.body;

        // Agar parts string bo'lsa (multipart/form-data shunaqa yuboradi), uni parse qilamiz
        if (parts && typeof parts === "string") {
            try {
                parts = JSON.parse(parts);
            } catch (e) {
                return res.status(400).json({ message: "Parts JSON formati noto'g'ri" });
            }
        }

        if (!title) {
            return res.status(400).json({ message: "title majburiy! Hozirgi body: " + JSON.stringify(req.body) });
        }

        const audioUrl = req.file ? `audios/${req.file.filename}` : null

        const listening = await Listening.create({
            title,
            audioUrl
        })

        for (const part of parts) {
            const createdPart = await listeningPart.create({
                listeningId: listening.id,
                part_name: part.part_name || null,
                part_number: part.part_number || null,
                part_range: part.part_range || null,
                part_instruction: part.part_instruction || null
            })

            const questions = part.questions || []

            for (const question of questions) {
                const createdQuestion = await listeningQuestion.create({
                    listeningPartId: createdPart.id,
                    question_type: question.question_type,
                    question_text: question.question_text || null,
                    answers: question.answers || null,
                    question_range: question.question_range || null,
                    extra_data: question.extra_data || {}
                })

                const options = question.options || []

                for (const option of options) {
                    await listeningOption.create({
                        listeningQuestionId: createdQuestion.id,
                        variant: option.variant || null,
                        variant_text: option.variant_text || null
                    })
                }
            }
        }

        const result = await Listening.findByPk(listening.id, {
            include: [
                {
                    model: listeningPart,
                    as: "parts",
                    include: [
                        {
                            model: listeningQuestion,
                            as: "questions",
                            include: [
                                {
                                    model: listeningOption,
                                    as: "options"
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        return res.status(201).json({
            message: "Listening muvaffaqiyatli yaratildi",
            data: result
        })
    } catch (error) {
        ServerError(res, error)
    }
}





const updateListening = async (req, res) => {
    try {
        const { id } = req.params
        const { title, parts = [] } = req.body

        const existListening = await Listening.findByPk(id, {
            include: [
                {
                    model: listeningPart,
                    as: "parts",
                    include: [
                        {
                            model: listeningQuestion,
                            as: "questions",
                            include: [
                                {
                                    model: listeningOption,
                                    as: "options"
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        if (!existListening) {
            ValidError(res, 404, "Listening topilmadi")
        }

        let updatedAudioUrl = existListening.audioUrl

        if (req.file) {
            updatedAudioUrl = `audios/${req.file.filename}`
        }

        await Listening.update(
            {
                title: title ?? existListening.title,
                audioUrl: updatedAudioUrl
            },
            {
                where: { id }
            }
        )

        const oldParts = await listeningPart.findAll({
            where: { listeningId: id },
            include: [
                {
                    model: listeningQuestion,
                    as: "questions",
                    include: [
                        {
                            model: listeningOption,
                            as: "options"
                        }
                    ]
                }
            ]
        })

        for (const part of oldParts) {
            for (const question of part.questions) {
                await listeningOption.destroy({
                    where: { listeningQuestionId: question.id }
                })
            }

            await listeningQuestion.destroy({
                where: { listeningPartId: part.id }
            })
        }

        await listeningPart.destroy({
            where: { listeningId: id }
        })

        for (const part of parts) {
            const createdPart = await listeningPart.create({
                listeningId: id,
                part_name: part.part_name || null,
                part_number: part.part_number || null,
                part_range: part.part_range || null,
                part_instruction: part.part_instruction || null
            })

            const questions = part.questions || []

            for (const question of questions) {
                const createdQuestion = await listeningQuestion.create({
                    listeningPartId: createdPart.id,
                    question_type: question.question_type,
                    question_text: question.question_text || null,
                    answers: question.answers || null,
                    question_range: question.question_range || null,
                    extra_data: question.extra_data || {}
                })

                const options = question.options || []

                for (const option of options) {
                    await listeningOption.create({
                        listeningQuestionId: createdQuestion.id,
                        variant: option.variant || null,
                        variant_text: option.variant_text || null
                    })
                }
            }
        }

        const updated = await Listening.findByPk(id, {
            include: [
                {
                    model: listeningPart,
                    as: "parts",
                    include: [
                        {
                            model: listeningQuestion,
                            as: "questions",
                            include: [
                                {
                                    model: listeningOption,
                                    as: "options"
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        return res.status(200).json({
            message: "Listening yangilandi",
            data: updated
        })
    } catch (error) {
        ServerError(res, error)
    }
}




const deleteListening = async (req, res) => {
    try {
        const { id } = req.params

        const existListening = await Listening.findByPk(id, {
            include: [
                {
                    model: listeningPart,
                    as: "parts",
                    include: [
                        {
                            model: listeningQuestion,
                            as: "questions"
                        }
                    ]
                }
            ]
        })

        if (!existListening) {
            ValidError(res, 404, "Listening topilmadi")
        }

        const parts = await listeningPart.findAll({
            where: { listeningId: id },
            include: [
                {
                    model: listeningQuestion,
                    as: "questions"
                }
            ]
        })

        for (const part of parts) {
            for (const question of part.questions) {
                await listeningOption.destroy({
                    where: { listeningQuestionId: question.id }
                })
            }

            await listeningQuestion.destroy({
                where: { listeningPartId: part.id }
            })
        }

        await listeningPart.destroy({
            where: { listeningId: id }
        })

        await Listening.destroy({
            where: { id }
        })

        return res.status(200).json({
            message: "Listening  o‘chirildi"
        })
    } catch (error) {
        ServerError(res, error)
    }
}



module.exports = {
    getAllListening,
    getOneListening,
    postListening,
    updateListening,
    deleteListening
}