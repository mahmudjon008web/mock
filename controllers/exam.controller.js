const db = require("../models/index")
const { ValidError, ServerError } = require("../service/validation")
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

    const listenings = await Listening.findAll({
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

    const readings = await Reading.findAll({
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
      order: [
        ["id", "ASC"],
        [{ model: ReadingPart, as: "parts" }, "part_number", "ASC"],
        [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, "id", "ASC"],
        [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, { model: Option, as: "options" }, "id", "ASC"]
      ]
    })

    const writings = await Writing.findAll()

    res.status(200).json({
      listening: listenings,
      reading: readings,
      writing: writings
    })

  } catch (error) {
    console.log("ERROR 👉", error)
    ServerError(res, error)
  }
}

const getExamById = async (req, res) => {
  try {
    const { id } = req.params

    // LISTENING
    const listening = await Listening.findByPk(id, {
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

    // READING
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
      ],
      order: [
        [{ model: ReadingPart, as: "parts" }, "part_number", "ASC"],
        [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, "id", "ASC"],
        [{ model: ReadingPart, as: "parts" }, { model: Question, as: "questions" }, { model: Option, as: "options" }, "id", "ASC"]
      ]
    })

    // WRITING
    const writing = await Writing.findByPk(id)

    // AGAR HAMMASI YO‘Q BO‘LSA
    if (!listening && !reading && !writing) {
      return ValidError(res, 404, "Ma'lumot topilmadi")
    }

    res.status(200).json({
      listening,
      reading,
      writing
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