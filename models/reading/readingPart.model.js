module.exports = (sequelize, Sequelize) => {
  const ReadingPart = sequelize.define("reading_part", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    part_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    part_texts: {
      type: Sequelize.JSONB,
      allowNull: true
    },
    part_number: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true
  })

  return ReadingPart
}