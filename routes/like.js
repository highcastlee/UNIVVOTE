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
                case 7:
                    user.isLiked7 = isState(req.body.state);
                    break;
                case 8:
                    user.isLiked8 = isState(req.body.state);
                    break;
                case 9:
                    user.isLiked9 = isState(req.body.state);
                    break;
                case 10:
                    user.isLiked10 = isState(req.body.state);
                    break;
                case 11:
                    user.isLiked11 = isState(req.body.state);
                    break;
                case 12:
                    user.isLiked12 = isState(req.body.state);
                    break;
                case 13:
                    user.isLiked13 = isState(req.body.state);
                    break;
                case 14:
                    user.isLiked14 = isState(req.body.state);
                    break;
                case 15:
                    user.isLiked15 = isState(req.body.state);
                    break;
                case 16:
                    user.isLiked16 = isState(req.body.state);
                    break;
                case 17:
                    user.isLiked17 = isState(req.body.state);
                    break;
                case 18:
                    user.isLiked18 = isState(req.body.state);
                    break;
                case 19:
                    user.isLiked19 = isState(req.body.state);
                    break;
                case 20:
                    user.isLiked20 = isState(req.body.state);
                    break;
                case 21:
                    user.isLiked21 = isState(req.body.state);
                    break;
                case 22:
                    user.isLiked22 = isState(req.body.state);
                    break;
                case 23:
                    user.isLiked23 = isState(req.body.state);
                    break;
                case 24:
                    user.isLiked24 = isState(req.body.state);
                    break;
                case 25:
                    user.isLiked25 = isState(req.body.state);
                    break;
                case 26:
                    user.isLiked26 = isState(req.body.state);
                    break;
                case 27:
                    user.isLiked27 = isState(req.body.state);
                    break;
                case 28:
                    user.isLiked28 = isState(req.body.state);
                    break;
                case 29:
                    user.isLiked29 = isState(req.body.state);
                    break;
                case 30:
                    user.isLiked30 = isState(req.body.state);
                    break;
                case 31:
                    user.isLiked31 = isState(req.body.state);
                    break;
                case 32:
                    user.isLiked32 = isState(req.body.state);
                    break;
                case 33:
                    user.isLiked33 = isState(req.body.state);
                    break;
                case 34:
                    user.isLiked34 = isState(req.body.state);
                    break;
                case 35:
                    user.isLiked35 = isState(req.body.state);
                    break;
                case 36:
                    user.isLiked36 = isState(req.body.state);
                    break;
                default:
                    break;
            }

            await user.save();
            res.status(201).json(); 
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;