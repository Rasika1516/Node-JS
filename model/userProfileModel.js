const {DataTypes,Sequelize}= require("sequelize");

module.exports = (Sequelize,DataTypes)=>{
    const UserProfile = Sequelize.define("userProfile",{
        name:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phno:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return UserProfile
}