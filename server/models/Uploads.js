const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Uploads = sequelize.define("Uploads",{
        username:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        images:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    })
   
    Uploads.associate = (models) => {
        Uploads.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Uploads.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Uploads.hasMany(models.Dislikes, {
            onDelete: "cascade",
        });
    }

    
    return Uploads;
}