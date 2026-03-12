module.exports = (sequelize, Sequelize)=>{
    const Listening = sequelize.define("listening", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        audioUrl: {
           type: Sequelize.STRING,
           allowNull: true 
        }
    }, {
        timestamps: true
    })
    return Listening
}