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
    const data = await Exam.findAll({
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
      ],
      order: [
        ["id", "ASC"],

        // LISTENING
        [{ model: Listening, as: "listening" }, { model: listeningPart, as: "parts" }, "part_number", "ASC"],
        [{ model: Listening, as: "listening" }, { model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, "id", "ASC"],
        [{ model: Listening, as: "listening" }, { model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, { model: listeningOption, as: "options" }, "id", "ASC"],

        // READING
        [{ model: Reading, as: "reading" }, { model: ReadingPart, as: "parts" }, "part_number", "ASC"],
        [{ model: Reading, as: "reading" }, { model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, "id", "ASC"],
        [{ model: Reading, as: "reading" }, { model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, { model: Option, as: "options" }, "id", "ASC"]
      ]
    })

    res.status(200).json({
      count: data.length,
      data
    })

  } catch (error) {
    console.log(error)
    ServerError(res, error)
  }
}

const getExamById = async (req, res) => {
  try {
    const { id } = req.params

    const data = await Exam.findByPk(id, {
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
      ],
      order: [
        // LISTENING ORDER
        [{ model: Listening, as: "listening" }, { model: listeningPart, as: "parts" }, "part_number", "ASC"],
        [{ model: Listening, as: "listening" }, { model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, "id", "ASC"],
        [{ model: Listening, as: "listening" }, { model: listeningPart, as: "parts" }, { model: listeningQuestion, as: "questions" }, { model: listeningOption, as: "options" }, "id", "ASC"],

        // READING ORDER
        [{ model: Reading, as: "reading" }, { model: ReadingPart, as: "parts" }, "part_number", "ASC"],
        [{ model: Reading, as: "reading" }, { model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, "id", "ASC"],
        [{ model: Reading, as: "reading" }, { model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, { model: Option, as: "options" }, "id", "ASC"]
      ]
    })

    if (!data) {
      ValidError(res, 404, "Exam topilmadi")
    }

    res.status(200).json({
      data
    })

  } catch (error) {
    console.log("ERROR 👉", error)
    res.status(500).json({
      message: error.message,
      stack: error.stack
    })
  }
}


module.exports = {
    getAllExams,
    getExamById
}