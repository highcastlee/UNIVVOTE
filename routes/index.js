const express = require('express');
const fs = require('fs');
const {User,Comment, Vote, Major} = require('../models');
const router = express.Router();
// Comment.create({
//     comment:'4번째 댓글입니다',
//     commenter:3,
// });
router.get('/',async (req,res,next)=>{
    try{

        const users = await User.findAll({});
        const comments = await Comment.findAll({
            order:[['created_at','DESC']],
            limit:4,
        });
        const voteInfo = await Vote.findOne({});
        const voteJSON = JSON.stringify(voteInfo);
        fs.writeFileSync('./public/voteInfo.json',voteJSON);        
        
        const majorInfo = await Major.findAll({
            order:[['majorId']],
            limit:10,
        });
        const majorJSON = JSON.stringify(majorInfo);
        fs.writeFileSync('./public/majorInfo.json',majorJSON);  


        res.render('index',{users, comments, voteInfo, majorInfo});
    }catch(err){
        console.error(err);
        next(err);
    }
});
// router.post('/vote',async (req,res,next)=>{
//     try{
//         const vote = await Vote.create({

//         })
//     }
// )


module.exports = router;