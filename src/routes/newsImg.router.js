const { getAll, create, remove } = require('../controllers/newsImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const newsImgRouter = express.Router();

newsImgRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create)

newsImgRouter.route('/:id')
    .delete(verifyJWT, remove)

module.exports = newsImgRouter;