const express = require('express');
const userRouter = express.Router();


userRouter
    .route('/login')
    .post(login)

userRouter 
    .route('/signup')
    .post(signup)


module.exports = userRouter;