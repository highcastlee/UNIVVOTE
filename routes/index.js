const express = require('express');
const fs = require('fs');
const {User,Comment, Vote, Major, Like} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();

router.use((req,res,next)=>{
    //nunjucks 사용을 위한 res.locals
    // res.locals.user = req.user;

    // res.locals.user = req.session.user;
    res.session = req.session.user;
    console.log('=====res.session : '+res.session);
    next();
});

router.get('/',async (req,res,next)=>{
    try{
        const comments = await Comment.findAll({
            order:[['created_at','DESC']],
            limit:4,
        });
        const user = req.session.user;
        console.log('comments : '+comments);
        res.render('index',{user, comments});
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;