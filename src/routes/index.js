const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const newsRouter = require('./news.router');
const newsImgRouter = require('./newsImg.router');
const favoriteRouter = require('./favorite.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/news', newsRouter);
router.use('/news_images', newsImgRouter);
router.use('/favorites', favoriteRouter);

module.exports = router;
