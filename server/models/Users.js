const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        username:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Dislikes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Uploads, {
            onDelete: "cascade",
          });
    };
   
    return Users;
}