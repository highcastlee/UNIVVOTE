const express = require('express');
const fs = require('fs');
const {User,Comment, Vote, Major, Like} = require('../models');
const router = express.Router();

router.get('/',async (req,res,next)=>{
    try{

        // user 테이블 읽기
        const users = await User.findAll({});
        //comment 테이블 4 rows 역순으로 읽기 
        const comments = await Comment.findAll({
            order:[['created_at','DESC']],
            limit:4,
        });
        //voteInfo 테이블 후보별 득표 수 읽기 및 JSON 저장
        const voteInfo = await Vote.findOne({});
        const voteJSON = JSON.stringify(voteInfo);
        fs.writeFileSync('./public/voteInfo.json',voteJSON);
        
        //majorInfo 테이블에서 학과별 투표 수 읽기 및 저장
        //정렬은 amchart.js에서 JSON받아서 진행함
        const majorInfo = await Major.findAll({
            order:[['voteCount', 'DESC']],
            limit:10,
        });
        const majorJSON = JSON.stringify(majorInfo);
        fs.writeFileSync('./public/majorInfo.json',majorJSON);

        const likes = await Like.findAll({});
        


        res.render('index',{users, comments, voteInfo, majorInfo});
    }catch(err){
        console.error(err);
        next(err);
    }
});



module.exports = router;