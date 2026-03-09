module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNUll: false,
            unique: false
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNUll: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNUll: false
        },
        role: {
            type: Sequelize.STRING,
            allowNUll: true,
            defaultValue: "user"
        },
        isLogged: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true
    })
    return User
}