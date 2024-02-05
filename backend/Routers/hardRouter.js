const express = require('express');
const hardRouter = express.Router();
const storeData = require('../controller/hardController')


hardRouter
    .route('/')
    .post(storeData)

module.exports = hardRouter;