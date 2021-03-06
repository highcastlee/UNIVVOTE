const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {User, Comment} = require('../models');
const sanitizeHtml = require('sanitize-html');

const router = express.Router();

router.post('/',isLoggedIn, async (req,res,next)=>{
    
    try{
        //꼭 현재 로그인 중인 user id를 가져와야함...!!세션 or 쿠키 사용해야할 듯

        const user = await User.findOne({
            where:{userId:req.session.user.userId}
        });

        user.isCommented = 1;
        await user.save();
        
        const userComment = sanitizeHtml(req.body.userComment);
        Comment.create({
            comment: userComment,
            commenter:user.userId,
        });
        res.status(201).json();
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;