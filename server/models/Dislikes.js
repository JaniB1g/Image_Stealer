const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Dislikes = sequelize.define("Dislikes");
        
    return Dislikes;
}