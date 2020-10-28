const express = require('express');
const fs = require('fs');
const {User, Vote, Major} = require('../models');

const router = express.Router();

router.route('/')
    .post(async (req,res,next)=>{
        try{
            //후보별 득표 수 추가하기
            const voteInfo = await Vote.findOne({});
            voteInfo.candidate_01 += req.body.candidate_01;
            voteInfo.candidate_02 += req.body.candidate_02;
            await voteInfo.save();
            const votePlusJSON = JSON.stringify(voteInfo);
            
            //전공별 투표 약속 수 추가하기
            const majorInfo = await Major.findOne({
                where:{majorId:req.body.majorId}
            });
            majorInfo.voteCount +=1;
            await majorInfo.save();
            
            res.status(201).json(); 
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;