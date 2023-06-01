const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const NewsImg = sequelize.define('newsImg', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // newsId
});

module.exports = NewsImg;