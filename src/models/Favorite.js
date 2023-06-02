const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Favorite = sequelize.define('favorite', {
    // userId
    // newsId
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Favorite;