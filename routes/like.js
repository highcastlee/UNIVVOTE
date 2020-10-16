const express = require('express');
const fs = require('fs');
const {User, Like} = require('../models');

const router = express.Router();

router.route('/')
    .post(async (req,res,next)=>{
        try{

        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;