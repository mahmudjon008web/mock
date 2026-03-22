const db = require("../models/index")
const { ValidError, ServerError } = require("../service/validation")
const Exam = db.Exam
const Listening = db.Listening
const Reading = db.Reading
const Writing = db.Writing
const listeningOption = db.listeningOption
const listeningQuestion = db.listeningQuestion
const listeningPart = db.listeningPart
const Question = db.Question
const ReadingPart = db.ReadingPart
const Option = db.Option

const getAllExams = async (req, res) => {
  try {
    const data = await db.Exam.findAll({
      include: [
        {
          model: db.Listening,
          as: "listening",
          include: [
            {
              model: db.listeningPart,
              as: "parts",
              include: [
                {
                  model: db.listeningQuestion,
                  as: "questions",
                  include: [
                    {
                      model: db.listeningOption,
                      as: "options"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          model: db.Reading,
          as: "reading",
          include: [
            {
              model: db.ReadingPart,
              as: "parts",
              include: [
                {
                  model: db.Question,
                  as: "questions",
                  include: [
                    {
                      model: db.Option,
                      as: "options"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          model: db.Writing,
          as: "writing"
        }
      ]
    })

    res.status(200).json({
      count: data.length,
      data
    })

  } catch (error) {
    console.log("ERROR 👉", error)
    ServerError(res, error)
  }
}

const getExamById = async (req, res) => {
  try {
    const { id } = req.params

    const data = await db.Exam.findByPk(id, {
      include: [
        {
          model: db.Listening,
          as: "listening",
          include: [
            {
              model: db.listeningPart,
              as: "parts",
              include: [
                {
                  model: db.listeningQuestion,
                  as: "questions",
                  include: [
                    {
                      model: db.listeningOption,
                      as: "options"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          model: db.Reading,
          as: "reading",
          include: [
            {
              model: db.ReadingPart,
              as: "parts",
              include: [
                {
                  model: db.Question,
                  as: "questions",
                  include: [
                    {
                      model: db.Option,
                      as: "options"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          model: db.Writing,
          as: "writing"
        }
      ]
    })

    if (!data) {
      return ValidError(res, 404, "Exam topilmadi")
    }

    res.status(200).json({
      data
    })

  } catch (error) {
    console.log("ERROR 👉", error)
    ServerError(res, error)
  }
}


module.exports = {
    getAllExams,
    getExamById
}