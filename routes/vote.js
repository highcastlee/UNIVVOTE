const express = require('express');
const {User, Vote} = require('../models');

const router = express.Router();

router.get('/',async (req,res,next)=>{
    try{
        const userInfo = await User.findAll();
        const voteInfo = await Vote.findAll();
        res.json(userInfo);
        res.json(voteInfo);
        console.log(res.json(voteInfo));
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/',async (req,res,next)=>{
    try{
        const voteInfo = await Vote.create({
            id:req.body.id,
            candidate_01:req.body.candidate_01,
            candidate_02:req.body.candidate_02,
        });
        console.log(voteInfo);
        res.status(201).json(voteInfo);
    }catch(err){
        console.error(err);
        next(err);
    }
});
