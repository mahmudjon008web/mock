module.exports = (sequelize, Sequelize)=>{
    const Exam = sequelize.define("exam", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        listeningId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        readingId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        writingId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },{
        timestamps: true
    })
    return Exam 
}