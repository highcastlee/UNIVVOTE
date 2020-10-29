const express = require('express');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/logout',(req,res)=>{
    console.log('~~~~~~~~~~해당 서비스에서만 로그아웃~~~~~~~');
    console.log(req.isAuthenticated());
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/',
}),(req,res)=>{
    console.log('~~~~~~~~~~로그인 됐다~~~~~~~');
    console.log(req.isAuthenticated());
    res.redirect('/');
});

module.exports = router;