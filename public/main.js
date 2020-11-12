
//새로고침 시, 양식제출 물음 무시
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

function Modal(id){
    this.obj = document.getElementById(id);
}

Modal.prototype.openModal = function(){
    this.obj.setAttribute("style","display:block; z-Index:999; animation: modal-fadein 1s;");
}
Modal.prototype.closeModal = function(){
    this.obj.setAttribute("style","display:none;");
}
Modal.prototype.fadeoutCloseModal = function(){;
    this.obj.setAttribute("style","display:block; z-Index:999; animation: modal-fadeout 1.3s;");
    this.fadeoutDelay();
}
Modal.prototype.fadeoutDelay = function(){
    setTimeout(()=>{;
        this.closeModal();
    },1000);
}



const sharingBtn = document.getElementById("sharingBtn");
const urlModal = new Modal('urlModal');
sharingBtn.addEventListener('click',function(){
    urlModal.openModal();
    CopyUrlToClipboard();
    setTimeout(()=>{
        urlModal.fadeoutCloseModal();
    },2000);
});

var urlText = document.getElementById("urlText");
urlText.value = window.document.location.href;
var CopyUrlToClipboard = function (){
	urlText.select();  // 해당 값이 선택되도록 select() 합니다
	document.execCommand("copy"); // 클립보드에 복사합니다.
    urlText.blur(); // 선택된 것을 다시 선택안된것으로 바꿈니다.
};

const loginBtn = document.getElementById("loginBtn");
const loginModal = new Modal('loginModal');
if(loginBtn!=null){
    loginBtn.addEventListener('click',function(){
        loginModal.openModal();
    });
}


const voteBtn = document.getElementById("voteBtn");
const voteModal = new Modal('voteModal');
voteBtn.addEventListener('click',function(){
    voteModal.openModal();
});

const writeBtn = document.getElementById('writeBtn');
const writeModal = new Modal('writeModal');
writeBtn.addEventListener('click',function(){
    writeModal.openModal();
})

//if문 구분 함수 리팩토링 필요함..
const backBtnBox = document.getElementsByClassName('back-btn-box');
for(let i = 0; i<backBtnBox.length;i++){
    backBtnBox[i].addEventListener('click',function(){
        if(i==0){
            loginModal.closeModal();
        }
        else if(i==1){
            voteModal.closeModal();
        }else if(i==2){
            writeModal.closeModal();
        }else{
            return;
        }
    });
}


function numberCounter(target_frame, target_number,plus_number,Is_float) {
    this.count = 0.0; this.diff = 0;
    this.plus = plus_number;
    this.Isfloat = Is_float;
    this.target_count = parseFloat(target_number).toFixed(this.Isfloat);
    this.target_frame = document.getElementById(target_frame);
    this.timer = null;
    this.counter();
};
numberCounter.prototype.counter = function() {
    var self = this;
    this.diff = this.target_count - this.count;
    this.diff = this.diff;
    if(this.diff > 0) {
        self.count += this.plus;
    }
    this.target_frame.innerHTML = this.count.toFixed(this.Isfloat).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if(this.count < this.target_count) {
        this.timer = setTimeout(function() { self.counter(); }, 30);
    } else {
        this.target_frame.innerHTML = this.target_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        clearTimeout(this.timer);
    }
};



function calculater(count,sum){
    this.count = count;
    this.sum = sum;
};
calculater.prototype.calcPercent = function(){
    return (this.count/this.sum)*100;
};


let voteInfo, voteParsed, voteCount, studentCount, speed= 0;
const req = new XMLHttpRequest();
req.responseType = 'text';
req.open("GET","voteInfo.json",true);
req.send(null);
req.addEventListener("load",function(){
    voteInfo = req.responseText;
    voteParsed = JSON.parse(voteInfo);
    voteCount = voteParsed.voteCount;
    studentCount = voteParsed.studentCount;
    if(voteCount>3000){
        speed = 47;
    }else if(voteCount>1000){
        speed = 37;
    }else{
        speed = 17;
    }
    const studentData = document.getElementById('studentData');
    studentData.innerHTML='/ '+studentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let votePercent = new calculater(voteCount,studentCount).calcPercent();
    new numberCounter("percentData", votePercent, 0.7,true);
    // new numberCounter("percentRight", rightPercent, 1.1,true);
    new numberCounter("countData",voteCount, speed, false);
    // new numberCounter("countRight",candidateRightCount, 7, false);
},false);


// var checkDouble = function(obj){
//     if(obj.getAttribute('checked')=='true'){
//         obj.removeAttribute('checked');
//     }else{
//         obj.setAttribute('checked','true');
//     }
// };
// var checkAnother = function(obj){
//     if(obj.getAttribute('checked')=='true'){
//         obj.removeAttribute('checked');
//     };
// }

// const inputLeft = document.getElementById('inputLeft');
// const inputRight = document.getElementById('inputRight');
// const checkBoxLeft = document.getElementById('modal-candidate-left');
// const checkBoxRight = document.getElementById('modal-candidate-right');
// checkBoxLeft.addEventListener('click',function(){
//     checkAnother(inputRight);
//     checkDouble(inputLeft);
// });
// checkBoxRight.addEventListener('click',function(){
//     checkAnother(inputLeft);
//     checkDouble(inputRight);
// });


// const isChecked = function(bool){
//     if(bool){
//         return 1;
//     }else{
//         return 0;
//     }
// }

document.getElementById('voteForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    //체크된 후보는 1, 아닌 후보는 0을 넘김
    // const candidate_01 = isChecked(e.target.inputLeft.checked);
    // const candidate_02 = isChecked(e.target.inputRight.checked);
    // if(!(candidate_01 || candidate_02)){
    //     return alert('후보자를 선택하세요');
    // }
    //선택된 전공의 majorId 값을 넘김
    const major = e.target.userMajor;
    const majorId = major.options[major.selectedIndex].value;
    const data = {'majorId':majorId};
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 || xhr.status === 201) {
        console.log(xhr.responseText);
      }else {
        console.error(xhr.responseText);
      }
    };
    xhr.open('POST', '/vote', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); 
    xhr.send(JSON.stringify(data)); // 데이터를 stringify해서 보냄
    location.reload();
    // try{
    //     await axios.post('/vote',{majorId});
    //     location.reload();
    // }catch(err){
    //     console.error(err);
    // }
});

const unSubmit = document.getElementsByClassName('unSubmit')
for(let i = 0;i<unSubmit.length;i++){
    unSubmit[i].addEventListener('click',function(e){
        alert('로그인이 필요한 서비스입니다.');
        e.preventDefault();
    });
}
const alreadySubmit = document.getElementsByClassName('alreadySubmit')
for(let i = 0;i<alreadySubmit.length;i++){
    alreadySubmit[i].addEventListener('click',function(e){
        alert('이미 참여하셨습니다.');
        e.preventDefault();
    });
}

document.getElementById('writeForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    const userComment= e.target.writeContent.value;
    if(!userComment){
        return alert('내용을 입력하세요');
    }
    try{
        const commentData = {'userComment':userComment};
        const commentXhr = new XMLHttpRequest();
        commentXhr.onreadystatechange = function() {
        if (commentXhr.status === 200 || commentXhr.status === 201) {
            console.log(commentXhr.responseText);
        }else {
            console.error(commentXhr.responseText);
        }
        };
        commentXhr.open('POST', '/comment', true);
        commentXhr.setRequestHeader('Content-Type', 'application/json'); 
        commentXhr.send(JSON.stringify(commentData)); // 데이터를 stringify해서 보냄
        location.reload();
    }catch(err){
        console.error(err);
    }
});




function Like(btnId,countId){
    this.objBtn = document.getElementById(btnId);
    this.objCount = document.getElementById(countId);
    this.count;
    this.state = false;
    return;
}

Like.prototype={
    getCount : function(){return this.count;},
    setCount : function(x){this.count = x;},
    getIsLiked : function(){return this.state;},
    setClickEvent : function(){
        this.changeLikeBtn();
        this.changeLikeCount();
        this.changeLikeState();
    },
    displayCount : function(){
        this.objCount.textContent=this.count;
    },
    changeLikeCount : function(){
        if(this.state){
            this.objCount.textContent=--this.count;
        }else{
            this.objCount.textContent=++this.count;
        }
    },
    changeLikeBtn : function(){
        if(this.state){
            this.objBtn.setAttribute("src",'image/heartBlue.png');
        }else{
            this.objBtn.setAttribute("src",'image/heartRed.png');
        }
    },
    changeLikeState : function(){
        if(this.state){
            this.state=false;
        }else{
            this.state=true;
        }
    },
    addEvent : function(id){
        let self=this;
        this.objBtn.addEventListener('click',async function(){
            self.setClickEvent();
            let count = self.getCount();
            let likeId = id;
            let state = self.state;
            try{
                const likeData = {'count':count,'likeId':likeId,'state':state};
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/like', true);
                xhr.setRequestHeader('Content-Type', 'application/json'); 
                xhr.send(JSON.stringify(likeData)); // 데이터를 stringify해서 보냄
                // await axios.post('/like',{likeId,count,state});
            }catch(err){
                console.error(err);
            }
        });
    },
    checkLogin:function(){
        return this.objBtn.classList[1] =='unSubmit';
    },
    checkLikeState:function(){
        if(this.objBtn.className=='pledge-like-btn-red'){
            this.changeLikeState();
        }
    }
}



let likeInfo, likeParsed;
const likeReq = new XMLHttpRequest();
likeReq.responseType = 'text';
likeReq.open("GET","likeInfo.json",true);
likeReq.send(null);
likeReq.addEventListener("load",function(){
    likeInfo = likeReq.responseText; 
    likeParsed = JSON.parse(likeInfo);
    const setLikeSystem = function(id,obj_1,obj_2,obj_3,obj_4,obj_5,obj_6){
        obj_1.checkLikeState();
        obj_2.checkLikeState();
        obj_3.checkLikeState();
        obj_4.checkLikeState();
        obj_5.checkLikeState();
        obj_6.checkLikeState();
        obj_1.setCount(likeParsed[id-1].sum);
        obj_1.displayCount();
        obj_2.setCount(likeParsed[id].sum);
        obj_2.displayCount();
        obj_3.setCount(likeParsed[id+1].sum);
        obj_3.displayCount();
        obj_4.setCount(likeParsed[id+2].sum);
        obj_4.displayCount();
        obj_5.setCount(likeParsed[id+3].sum);
        obj_5.displayCount();
        obj_6.setCount(likeParsed[id+4].sum);
        obj_6.displayCount();
        if( obj_1.checkLogin()  ||
            obj_2.checkLogin()  ||
            obj_3.checkLogin()  ||
            obj_4.checkLogin() ||
            obj_5.checkLogin() ||
            obj_6.checkLogin()   ){
            return;
        }
        obj_1.addEvent(id);
        obj_2.addEvent(id+1);
        obj_3.addEvent(id+2);
        obj_4.addEvent(id+3);
        obj_5.addEvent(id+4);
        obj_6.addEvent(id+5);
    }
    const associationLikeLeft_01 = new Like('associationLikeBtnLeft-01','associationLikeCountLeft-01');
    const associationLikeLeft_02 = new Like('associationLikeBtnLeft-02','associationLikeCountLeft-02');
    const associationLikeLeft_03 = new Like('associationLikeBtnLeft-03','associationLikeCountLeft-03');
    const associationLikeRight_01 = new Like('associationLikeBtnRight-01','associationLikeCountRight-01');
    const associationLikeRight_02 = new Like('associationLikeBtnRight-02','associationLikeCountRight-02');
    const associationLikeRight_03 = new Like('associationLikeBtnRight-03','associationLikeCountRight-03');

    const energyLikeLeft_01 = new Like('energyLikeBtnLeft-01','energyLikeCountLeft-01');
    const energyLikeLeft_02 = new Like('energyLikeBtnLeft-02','energyLikeCountLeft-02');
    const energyLikeLeft_03 = new Like('energyLikeBtnLeft-03','energyLikeCountLeft-03');
    const energyLikeRight_01 = new Like('energyLikeBtnRight-01','energyLikeCountRight-01');
    const energyLikeRight_02 = new Like('energyLikeBtnRight-02','energyLikeCountRight-02');
    const energyLikeRight_03 = new Like('energyLikeBtnRight-03','energyLikeCountRight-03');

    const engineeringLikeLeft_01 = new Like('engineeringLikeBtnLeft-01','engineeringLikeCountLeft-01');
    const engineeringLikeLeft_02 = new Like('engineeringLikeBtnLeft-02','engineeringLikeCountLeft-02');
    const engineeringLikeLeft_03 = new Like('engineeringLikeBtnLeft-03','engineeringLikeCountLeft-03');
    const engineeringLikeRight_01 = new Like('engineeringLikeBtnRight-01','engineeringLikeCountRight-01');
    const engineeringLikeRight_02 = new Like('engineeringLikeBtnRight-02','engineeringLikeCountRight-02');
    const engineeringLikeRight_03 = new Like('engineeringLikeBtnRight-03','engineeringLikeCountRight-03');

    const humanityLikeLeft_01 = new Like('humanityLikeBtnLeft-01','humanityLikeCountLeft-01');
    const humanityLikeLeft_02 = new Like('humanityLikeBtnLeft-02','humanityLikeCountLeft-02');
    const humanityLikeLeft_03 = new Like('humanityLikeBtnLeft-03','humanityLikeCountLeft-03');
    const humanityLikeRight_01 = new Like('humanityLikeBtnRight-01','humanityLikeCountRight-01');
    const humanityLikeRight_02 = new Like('humanityLikeBtnRight-02','humanityLikeCountRight-02');
    const humanityLikeRight_03 = new Like('humanityLikeBtnRight-03','humanityLikeCountRight-03');

    const informationLikeLeft_01 = new Like('informationLikeBtnLeft-01','informationLikeCountLeft-01');
    const informationLikeLeft_02 = new Like('informationLikeBtnLeft-02','informationLikeCountLeft-02');
    const informationLikeLeft_03 = new Like('informationLikeBtnLeft-03','informationLikeCountLeft-03');
    const informationLikeRight_01 = new Like('informationLikeBtnRight-01','informationLikeCountRight-01');
    const informationLikeRight_02 = new Like('informationLikeBtnRight-02','informationLikeCountRight-02');
    const informationLikeRight_03 = new Like('informationLikeBtnRight-03','informationLikeCountRight-03');

    const welfareLikeLeft_01 = new Like('welfareLikeBtnLeft-01','welfareLikeCountLeft-01');
    const welfareLikeLeft_02 = new Like('welfareLikeBtnLeft-02','welfareLikeCountLeft-02');
    const welfareLikeLeft_03 = new Like('welfareLikeBtnLeft-03','welfareLikeCountLeft-03');
    const welfareLikeRight_01 = new Like('welfareLikeBtnRight-01','welfareLikeCountRight-01');
    const welfareLikeRight_02 = new Like('welfareLikeBtnRight-02','welfareLikeCountRight-02');
    const welfareLikeRight_03 = new Like('welfareLikeBtnRight-03','welfareLikeCountRight-03');

    const artLikeLeft_01 = new Like('artLikeBtnLeft-01','artLikeCountLeft-01');
    const artLikeLeft_02 = new Like('artLikeBtnLeft-02','artLikeCountLeft-02');
    const artLikeLeft_03 = new Like('artLikeBtnLeft-03','artLikeCountLeft-03');
    const artLikeRight_01 = new Like('artLikeBtnRight-01','artLikeCountRight-01');
    const artLikeRight_02 = new Like('artLikeBtnRight-02','artLikeCountRight-02');
    const artLikeRight_03 = new Like('artLikeBtnRight-03','artLikeCountRight-03');

    const clubLikeLeft_01 = new Like('clubLikeBtnLeft-01','clubLikeCountLeft-01');
    const clubLikeLeft_02 = new Like('clubLikeBtnLeft-02','clubLikeCountLeft-02');
    const clubLikeLeft_03 = new Like('clubLikeBtnLeft-03','clubLikeCountLeft-03');
    const clubLikeRight_01 = new Like('clubLikeBtnRight-01','clubLikeCountRight-01');
    const clubLikeRight_02 = new Like('clubLikeBtnRight-02','clubLikeCountRight-02');
    const clubLikeRight_03 = new Like('clubLikeBtnRight-03','clubLikeCountRight-03');

    setLikeSystem(1,associationLikeLeft_01,associationLikeLeft_02,associationLikeLeft_03,associationLikeRight_01,associationLikeRight_02,associationLikeRight_03);
    setLikeSystem(7,welfareLikeLeft_01,welfareLikeLeft_02,welfareLikeLeft_03,welfareLikeRight_01,welfareLikeRight_02,welfareLikeRight_03);
    setLikeSystem(43,clubLikeLeft_01,clubLikeLeft_02,clubLikeLeft_03,clubLikeRight_01,clubLikeRight_02,clubLikeRight_03);
    setLikeSystem(13,humanityLikeLeft_01,humanityLikeLeft_02,humanityLikeLeft_03,humanityLikeRight_01,humanityLikeRight_02,humanityLikeRight_03);
    setLikeSystem(19,informationLikeLeft_01,informationLikeLeft_02,informationLikeLeft_03,informationLikeRight_01,informationLikeRight_02,informationLikeRight_03);
    setLikeSystem(25,engineeringLikeLeft_01,engineeringLikeLeft_02,engineeringLikeLeft_03,engineeringLikeRight_01,engineeringLikeRight_02,engineeringLikeRight_03);
    setLikeSystem(31,energyLikeLeft_01,energyLikeLeft_02,energyLikeLeft_03,energyLikeRight_01,energyLikeRight_02,energyLikeRight_03);
    setLikeSystem(37,artLikeLeft_01,artLikeLeft_02,artLikeLeft_03,artLikeRight_01,artLikeRight_02,artLikeRight_03);

});




const anchor = document.getElementsByClassName('anchor');
for(let i=0; i<anchor.length; i++){
    anchor[i].addEventListener('click',function(e){
        e.preventDefault();
    });
};
