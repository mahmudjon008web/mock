module.exports = (sequelize, Sequelize)=>{
    const listeningOption = sequelize.define("listeningOption", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        variant: {
            type: Sequelize.STRING,
            allowNull: true
        },
        variant_text: {
            type: Sequelize.STRING(1000),
            allowNull: true
        }
    },{
        timestamps: true
    })
    return listeningOption
}