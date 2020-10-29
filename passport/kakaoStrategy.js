const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () =>{
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done)=>{
        console.log('kakao profile',profile);
        try{
            const exUser = await User.findOne({
                where:{userId:profile.id},
            });
            if(exUser){
                done(null,exUser);
            }else{
                const newUser = await User.create({
                    userId: profile.id,
                });
                done(null,newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};