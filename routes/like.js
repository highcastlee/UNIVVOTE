const express = require('express');
const fs = require('fs');
const {User, Like} = require('../models');

const router = express.Router();

router.post('/', async (req,res,next)=>{
        try{
            const likeInfo = await Like.findOne({
                where: { likeId : req.body.likeId},
            });
            likeInfo.sum = req.body.count;
            await likeInfo.save();
            
            const likes = await Like.findAll({});
            const likeJSON = JSON.stringify(likes);
            fs.writeFileSync('./public/likeInfo.json',likeJSON);
            
            res.status(201).json(); 
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;