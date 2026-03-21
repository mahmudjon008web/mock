const db = require("../models/index")
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
    const exams = await Exam.findAll({
      include: [
        {
          model: Listening,
          as: "listening"
        },
        {
          model: Reading,
          as: "reading"
        },
        {
          model: Writing,
          as: "writing"
        }
      ],
      order: [["id", "DESC"]]
    })

    res.status(200).json({
      count: exams.length,
      data: exams
    })

  } catch (error) {
    ServerError(res, error)
  }
}

const getExamById = async (req, res) => {
  try {
    const { id } = req.params

    const exam = await Exam.findByPk(id, {
      include: [
        {
          model: Listening,
          as: "listening",
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
        },
        {
          model: Reading,
          as: "reading",
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
        },
        {
          model: Writing,
          as: "writing"
        }
      ]
    })

    if (!exam) {
      return ValidError(res, 404, "Exam topilmadi")
    }

    res.status(200).json({
      data: exam
    })

  } catch (error) {
    ServerError(res, error)
  }
}


module.exports = {
    getAllExams,
    getExamById
}