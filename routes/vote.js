const express = require('express');
const fs = require('fs');
const {User, Vote, Major} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/',isLoggedIn,async (req,res,next)=>{
    try{
        //후보별 득표 수 추가하기
        const voteInfo = await Vote.findOne({});
        voteInfo.candidate_01 += req.body.candidate_01;
        voteInfo.candidate_02 += req.body.candidate_02;
        await voteInfo.save();
        const voteJSON = JSON.stringify(voteInfo);
        fs.writeFileSync('./public/voteInfo.json',voteJSON);
        
        //전공별 투표 약속 수 추가하기
        const major = await Major.findOne({
            where:{majorId:req.body.majorId}
        });
        major.voteCount +=1;
        await major.save();
        
        const majorInfo = await Major.findAll({
            order:[['voteCount', 'DESC']],
            limit:10,
        });
        const majorJSON = JSON.stringify(majorInfo);
        fs.writeFileSync('./public/majorInfo.json',majorJSON);
        
        const user = await User.findOne({
            where:{userId:req.session.user.userId}
        });
        user.isVoted = 1;
        await user.save();

        res.status(201).json(); 
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;