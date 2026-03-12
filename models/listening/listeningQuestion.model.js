module.exports = (sequelize, Sequelize)=>{
    const listeningQuestion = sequelize.define("listeningQuestion", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question_type: {
            type: Sequelize.ENUM(
                "multiple_choice",
                "summary",
                "gap_filling",
                "limited_option"
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
    },{
        timestamps: true
    })
    return listeningQuestion
}