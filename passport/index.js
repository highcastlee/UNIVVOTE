const passport = require('passport');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user,done)=>{
        console.log('시리얼라이즈~~~~~~~~~~~~~'+user.Userid);
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        console.log('de시리얼라이즈~~~~~~~~~~~~~실행');

        User.findOne({where: {id}})
            .then(user=>done(null,user))
            .catch(err => done(err));
    });
    kakao();
};