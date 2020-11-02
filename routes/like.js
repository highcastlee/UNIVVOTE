const express = require('express');
const fs = require('fs');
const {User, Like} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const isState = (state)=>{
    if(state){
        return 1;
    }else{
        return 0;
    }
};
router.post('/', isLoggedIn,async (req,res,next)=>{
        try{
            //클릭한 likeId에 해당하는 sum의 count 수정
            const likeInfo = await Like.findOne({
                where: { likeId : req.body.likeId},
            });
            likeInfo.sum = req.body.count;
            await likeInfo.save();
            // LikeJson 파일 업데이트해서 다시 저장
            const likes = await Like.findAll({});
            const likeJSON = JSON.stringify(likes);
            fs.writeFileSync('./public/likeInfo.json',likeJSON);
            
            //user DB에서 해당 user의 isLiked 값 각각 반영
            // console.log('@@@@@@like 눌렀을 때 req.user.userId 값 : '+req.user.userId);
            const user = await User.findOne({
                where:{userId:req.session.user.userId}
            });
            switch(req.body.likeId){
                case 1:
                    user.isLiked1 = isState(req.body.state);
                    break;
                case 2:
                    user.isLiked2 = isState(req.body.state);
                    break;
                case 3:
                    user.isLiked3 = isState(req.body.state);
                    break;
                case 4:
                    user.isLiked4 = isState(req.body.state);
                    break;
                case 5:
                    user.isLiked5 = isState(req.body.state);
                    break;
                case 6:
                    user.isLiked6 = isState(req.body.state);
                    break;
                default:
                    break;
            }
            console.log('user 내용 : '+ user.isLiked1);
            await user.save();
            res.status(201).json(); 
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;