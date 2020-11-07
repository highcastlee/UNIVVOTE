const express = require('express');
const fs = require('fs');
const {User,Comment, Vote, Major, Like} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();

router.use((req,res,next)=>{
    res.session = req.session.user;
    next();
});

router.get('/',async (req,res,next)=>{
    try{
        const comments = await Comment.findAll({
            order:[['created_at','DESC']],
            limit:4,
        });
        let user = null;
        if(req.session.user){
            user = req.session.user;
        }else{
            user = {userId:null};
        }
    
        const condition = await User.findOne({
            where:{userId:user.userId}
        });

        res.render('index',{user, comments, condition});
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;