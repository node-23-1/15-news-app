const { getAll, create, getOne, remove, update, setNewsImgs } = require('../controllers/news.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const newsRouter = express.Router();

newsRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

newsRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

newsRouter.route('/:id/images')
    .post(verifyJWT, setNewsImgs)

module.exports = newsRouter;