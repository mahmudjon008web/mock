const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: "postgres",
    logging: false
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require("./user.model")(sequelize, Sequelize)
db.Writing = require("./writing.model")(sequelize, Sequelize)
db.ReadingPart = require("./reading/readingPart.model")(sequelize, Sequelize)
db.Question = require("./reading/question.model")(sequelize, Sequelize)
db.Option = require("./reading/option.model")(sequelize, Sequelize)
db.Reading = require("./reading/reading.model")(sequelize, Sequelize)
db.Listening = require("./listening/listening.model")(sequelize, Sequelize)
db.listeningPart = require("./listening/listeningPart.model")(sequelize, Sequelize)
db.listeningQuestion = require("./listening/listeningQuestion.model")(sequelize, Sequelize)
db.listeningOption = require("./listening/listeningOption.model")(sequelize, Sequelize)
db.Exam = require("./exam.model")(sequelize, Sequelize)


db.Reading.hasMany(db.ReadingPart, {
  foreignKey: "reading_id",
  as: "parts"
})

db.ReadingPart.belongsTo(db.Reading, {
  foreignKey: "reading_id",
  as: "reading"
})

db.ReadingPart.hasMany(db.Question, {
  foreignKey: "readingPartId",
  as: "questions"
})

db.Question.belongsTo(db.ReadingPart, {
  foreignKey: "readingPartId",
  as: "part"
})

db.Question.hasMany(db.Option, {
  foreignKey: "questionId",
  as: "options"
})

db.Option.belongsTo(db.Question, {
  foreignKey: "questionId",
  as: "question"
})

db.Listening.hasMany(db.listeningPart, {
    foreignKey: "listeningId",
    as: "parts",
    onDelete: "CASCADE"
})

db.listeningPart.belongsTo(db.Listening, {
    foreignKey: "listeningId",
    as: "listening"
})

db.listeningPart.hasMany(db.listeningQuestion, {
    foreignKey: "listeningPartId",
    as: "questions",
    onDelete: "CASCADE"
})

db.listeningQuestion.belongsTo(db.listeningPart, {
    foreignKey: "listeningPartId",
    as: "part"
})

db.listeningQuestion.hasMany(db.listeningOption, {
    foreignKey: "listeningQuestionId",
    as: "options",
    onDelete: "CASCADE"
})

db.listeningOption.belongsTo(db.listeningQuestion, {
    foreignKey: "listeningQuestionId",
    as: "question"
})

db.Exam.belongsTo(db.Listening, {
    foreignKey: "listeningId",
    as: "listening"
})

db.Exam.belongsTo(db.Reading, {
    foreignKey: "readingId",
    as: "reading"
})

db.Exam.belongsTo(db.Writing, {
    foreignKey: "writingId",
    as: "writing"
})

module.exports = db