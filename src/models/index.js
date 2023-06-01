const Category = require("./Category");
const News = require("./News");
const NewsImg = require("./NewsImg");

Category.hasMany(News);
News.belongsTo(Category);

News.hasMany(NewsImg);
NewsImg.belongsTo(News);
