const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');

module.exports = () =>{
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
        session : true,
        passReqToCallback: true,
    }, async(req, accessToken, refreshToken, profile, done)=>{
        try{
            const secretId = crypto.createHash('sha512').update(profile.id.toString()).digest('base64');
            console.log('이게 해시값 : '+secretId);
            const exUser = await User.findOne({
                where:{userId:secretId},
            });
            req.session.user = req.session.user || exUser;
            
            if(exUser){
                done(null,exUser);
            }else{
                const newUser = await User.create({
                    userId: secretId,
                });
                done(null,newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};