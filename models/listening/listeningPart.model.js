module.exports = (sequelize, Sequelize)=>{
    const listeningPart = sequelize.define("listeningPart", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        part_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        part_instruction: {
            type: Sequelize.STRING,
            allowNull: true
        },
        part_number: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        part_range: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        timestamps: true
    })
    return listeningPart
}