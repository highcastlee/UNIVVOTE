const passport = require('passport');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user,done)=>{
        console.log('시리얼라이즈~~~~~~~~~~~~~'+user);
        done(null,user.id);
        //req.session.passport.user에 user.id를 저장
    });

    passport.deserializeUser((id,done)=>{
        console.log('de시리얼라이즈~~~~~~~~~~~~~실행');
        //DB에서 정보가 일치하면 user값을 req.user에 넣는다.
        User.findOne({where: {id}})
            .then(user=>done(null,user))
            .catch(err => done(err));
    });
    kakao();
};