const express = require('express');
const fs = require('fs');
const {User, Like} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

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
            if(req.body.likeId == 1){
                if(req.body.state){
                    user.isLiked1 = 1;
                }else{
                    user.isLiked1 = 0;
                }
            }
            await user.save();
            res.status(201).json(); 
        }catch(err){
            console.error(err);
            next(err);
        }
    });

module.exports = router;