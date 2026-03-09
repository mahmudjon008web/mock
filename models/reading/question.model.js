module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_type: {
      type: Sequelize.ENUM(
        "true_false",
        "yes_no",
        "multiple_choice",
        "summary",
        "paragraph_matching",
        "gap_filling"
      ),
      allowNull: false
    },
    question_text: {
      type: Sequelize.JSONB,
      allowNull: true
    },
    answers: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: null
    },
    question_range: {
      type: Sequelize.STRING,
      allowNull: true
    },
    extra_data: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {}
    }
  }, {
    timestamps: true
  })

  return Question
}