module.exports = (sequelize, Sequelize)=>{
    const Writing = sequelize.define("writing", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task1_text: {
            type: Sequelize.STRING(5000),
            allowNull: false
        },
        task1_img: {
            type: Sequelize.STRING,
            allowNull: false
        },
        task2_text: {
            type: Sequelize.STRING(5000),
            allowNull: false
        }
    },
    {
        timestamps: true
    })
    return Writing
}