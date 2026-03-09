module.exports = (sequelize, Sequelize)=>{
    const Reading = sequelize.define("reading", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps: true
    })
    return Reading
}