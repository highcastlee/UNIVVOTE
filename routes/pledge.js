const express = require('express');
const fs = require('fs');
const {User,Comment, Vote, Major, Like} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();


router.get('/',async (req,res,next)=>{
    try{

        res.render('pledge',{});
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;