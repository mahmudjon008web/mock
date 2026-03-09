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

module.exports = db