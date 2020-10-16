const express = require('express');
const fs = require('fs');
const {User, Comment} = require('../models');

const router = express.Router();

router.route('/')
    .post(async (req,res,next)=>{
        try{
            //현재 user DB의 id와 comment DB의 commenter가 외래키로 연결되어있어서 해당하는 user id가 있어야 comment 생성가능한 상태 
            const userId = 3;
            const userComment = req.body.userComment;
            Comment.create({
                comment: userComment,
                commenter:userId,
            });
            res.status(201).json();
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;