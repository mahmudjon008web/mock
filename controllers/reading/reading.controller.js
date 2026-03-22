const db = require("../../models/index")
const { ServerError, ValidError } = require("../../service/validation")
const Option = db.Option
const Reading = db.Reading
const Question = db.Question
const ReadingPart = db.ReadingPart

const getAllReadings = async (req, res) => {
  try {
    const data = await Reading.findAll({
      include: [
        {
          model: ReadingPart,
          as: "parts",
          include: [
            {
              model: Question,
              as: "questions",
              include: [
                {
                  model: Option,
                  as: "options"
                }
              ]
            }
          ]
        }
      ],
      // order: [
      //   ["id", "ASC"],
      //   [{ model: ReadingPart, as: "parts" }, "part_number", "ASC"],
      //   [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }],
      //   [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, { model: Option, as: "options" }, "id", "ASC"]
      // ]
    })

    res.status(200).json(data)
  } catch (error) {
    ServerError(res, error)
  }
}


const getReadingById = async (req, res) => {
  try {
    const { id } = req.params

    const data = await Reading.findByPk(id, {
      include: [
        {
          model: ReadingPart,
          as: "parts",
          include: [
            {
              model: Question,
              as: "questions",
              include: [
                {
                  model: Option,
                  as: "options"
                }
              ]
            }
          ]
        }
      ],
      // order: [
      //   [{ model: ReadingPart, as: "parts" }, "part_number", "ASC"],
      //   [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }],
      //   [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, { model: Option, as: "options" }, "id", "ASC"]
      // ]
    })

    if (!data) {
      ValidError(res, 404, "Reading topilmadi")
    }
    res.status(200).json(data)
  } catch (error) {
    ServerError(res, error)
  }
}




const postReading = async (req, res) => {
  try {
    const { title, parts } = req.body

    if (!title) {
      ValidError(res, 400, "title kerak")
    }

    if (!parts || !Array.isArray(parts) || !parts.length) {
      ValidError(res, 400, "parts array bo'lishi kerak")
    }

    const createdReading = await Reading.create({
      title
    })

    const createdParts = []

    for (const part of parts) {
      const createdPart = await ReadingPart.create({
        reading_id: createdReading.id,
        part_name: part.part_name,
        part_texts: part.part_texts,
        part_number: part.part_number
      })

      const createdQuestions = []

      if (part.questions && Array.isArray(part.questions)) {
        for (const question of part.questions) {
          const createdQuestion = await Question.create({
            readingPartId: createdPart.id,
            question_type: question.question_type,
            question_text: question.question_text,
            answers: question.answers,
            question_range: question.question_range,
            extra_data: question.extra_data || {}
          })

          const createdOptions = []

          if (question.options && Array.isArray(question.options) && question.options.length) {
            for (const option of question.options) {
              const createdOption = await Option.create({
                questionId: createdQuestion.id,
                variant: option.variant,
                variant_text: option.variant_text
              })

              createdOptions.push(createdOption)
            }
          }

          createdQuestions.push({
            ...createdQuestion.toJSON(),
            options: createdOptions
          })
        }
      }

      createdParts.push({
        ...createdPart.toJSON(),
        questions: createdQuestions
      })
    }

    res.status(201).json({
      message: "Reading muvaffaqiyatli qo'shildi",
      data: {
        ...createdReading.toJSON(),
        parts: createdParts
      }
    })
  } catch (error) {
    ServerError(res, error)
  }
}





const updateReadingById = async (req, res) => {
  try {
    const { id } = req.params
    const { title, parts } = req.body

    const reading = await Reading.findByPk(id, {
      include: [
        {
          model: ReadingPart,
          as: "parts",
          include: [
            {
              model: Question,
              as: "questions",
              include: [
                {
                  model: Option,
                  as: "options"
                }
              ]
            }
          ]
        }
      ]
    })

    if (!reading) {
      ValidError(res, 404, "Reading topilmadi!")
    }

    if (title) {
      await reading.update({ title })
    }

    for (const part of reading.parts) {
      for (const question of part.questions) {
        await Option.destroy({
          where: { questionId: question.id }
        })
      }

      await Question.destroy({
        where: { readingPartId: part.id }
      })
    }

    await ReadingPart.destroy({
      where: { reading_id: id }
    })

    const createdParts = []

    for (const part of parts) {
      const createdPart = await ReadingPart.create({
        reading_id: id,
        part_name: part.part_name,
        part_texts: part.part_texts,
        part_number: part.part_number
      })

      const createdQuestions = []

      if (part.questions && Array.isArray(part.questions)) {
        for (const question of part.questions) {
          const createdQuestion = await Question.create({
            readingPartId: createdPart.id,
            question_type: question.question_type,
            question_text: question.question_text,
            question_range: question.question_range,
            answers: question.answers,
            extra_data: question.extra_data || {}
          })

          const createdOptions = []

          if (question.options && Array.isArray(question.options) && question.options.length) {
            for (const option of question.options) {
              const createdOption = await Option.create({
                questionId: createdQuestion.id,
                variant: option.variant,
                variant_text: option.variant_text
              })

              createdOptions.push(createdOption)
            }
          }

          createdQuestions.push({
            ...createdQuestion.toJSON(),
            options: createdOptions
          })
        }
      }

      createdParts.push({
        ...createdPart.toJSON(),
        questions: createdQuestions
      })
    }

    res.status(200).json({
      message: "Reading muvaffaqiyatli yangilandi",
      data: {
        id: reading.id,
        title: title || reading.title,
        parts: createdParts
      }
    })
  } catch (error) {
    ServerError(res, error)
  }
}




const deleteReadingByReadingId = async (req, res) => {
  try {
    const { id } = req.params

    const reading = await Reading.findByPk(id, {
      include: [
        {
          model: ReadingPart,
          as: "parts",
          include: [
            {
              model: Question,
              as: "questions",
              include: [
                {
                  model: Option,
                  as: "options"
                }
              ]
            }
          ]
        }
      ]
    })

    if (!reading) {
      return res.status(404).json({
        message: "Reading topilmadi"
      })
    }

    for (const part of reading.parts) {
      for (const question of part.questions) {
        await Option.destroy({
          where: { questionId: question.id }
        })
      }

      await Question.destroy({
        where: { readingPartId: part.id }
      })
    }

    await ReadingPart.destroy({
      where: { reading_id: id }
    })

    await Reading.destroy({
      where: { id }
    })

    res.status(200).json({
      message: "Reading muvaffaqiyatli o'chirildi"
    })
  } catch (error) {
    ServerError(res, error)
  }
}




module.exports = {
    getAllReadings,
    getReadingById,
    postReading,
    updateReadingById,
    deleteReadingByReadingId
}