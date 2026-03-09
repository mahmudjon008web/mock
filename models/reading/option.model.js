module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define("option", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    variant: {
      type: Sequelize.STRING,
      allowNull: true
    },
    variant_text: {
      type: Sequelize.STRING(1000),
      allowNull: true
    }
  }, {
    timestamps: true
  })

  return Option
}