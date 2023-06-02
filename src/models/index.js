const Category = require("./Category");
const Favorite = require("./Favorite");
const News = require("./News");
const NewsImg = require("./NewsImg");
const User = require("./User");

Category.hasMany(News);
News.belongsTo(Category);

News.hasMany(NewsImg);
NewsImg.belongsTo(News);

News.hasMany(Favorite);
Favorite.belongsTo(News);

Favorite.belongsTo(User);
User.hasMany(Favorite);

// Cart.belongsTo(User);
// Cart.belongsTo(Product);
