const express = require('express');
const fs = require('fs');
const {User, Vote, Major} = require('../models');

const router = express.Router();

router.route('/')
    .post(async (req,res,next)=>{
        try{
            const voteInfo = await Vote.findOne({});
            voteInfo.candidate_01 += req.body.candidate_01;
            voteInfo.candidate_02 += req.body.candidate_02;
            await voteInfo.save();
            const votePlusJSON = JSON.stringify(voteInfo);
            const majorInfo = await Major.findOne({
                where:{majorId:req.body.majorId}
            });
            majorInfo.voteCount +=1;
            await majorInfo.save();
            const majorJSON = JSON.stringify(majorInfo);
            res.status(201).json(votePlusJSON); 
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;