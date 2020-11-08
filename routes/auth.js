const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/logout',(req,res)=>{
    req.logout();
    req.session.destroy(()=>{
        res.clearCookie('connect.sid');
        res.redirect('/');
    })
    // console.log(req.isAuthenticated());
});

router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/',
}),(req,res)=>{
    // console.log(req.isAuthenticated());
    res.session.user = req.session.user;
    res.redirect('/');
});

module.exports = router;