
var mainTitle = document.getElementById('main-title');
mainTitle.addEventListener('click',function(){
    location.reload();
})
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
    this.diff = this.diff
    if(this.diff > 0) {
        self.count += this.plus;
    }
    this.target_frame.innerHTML = this.count.toFixed(this.Isfloat).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if(this.count < this.target_count) {
        this.timer = setTimeout(function() { self.counter(); }, 30);
    } else {
        this.target_frame.innerHTML = this.target_count;
        clearTimeout(this.timer);
    }
};



function calculater(count,sum){
    this.count = count;
    this.sum = sum;
};
calculater.prototype.calcPercent = function(){
    return this.count/this.sum*100;
};


let voteInfo, voteParsed, candidateLeftCount, candidateRightCount = 0;
const req = new XMLHttpRequest();
req.responseType = 'text';
req.open("GET","voteInfo.json",true);
req.send(null);
req.addEventListener("load",function(){
    voteInfo = req.responseText;
    voteParsed = JSON.parse(voteInfo);
    candidateLeftCount = voteParsed.candidate_01;
    candidateRightCount = voteParsed.candidate_02;
    let sum = candidateLeftCount + candidateRightCount;
    let leftPercent = new calculater(candidateLeftCount,sum).calcPercent();
    let rightPercent = new calculater(candidateRightCount,sum).calcPercent();
    
    new numberCounter("percentLeft", leftPercent, 1.1,true);
    new numberCounter("percentRight", rightPercent, 1.1,true);
    new numberCounter("countLeft",candidateLeftCount, 7, false);
    new numberCounter("countRight",candidateRightCount, 7, false);
},false);


var checkDouble = function(obj){
    if(obj.getAttribute('checked')=='true'){
        obj.removeAttribute('checked');
    }else{
        obj.setAttribute('checked','true');
    }
};
var checkAnother = function(obj){
    if(obj.getAttribute('checked')=='true'){
        obj.removeAttribute('checked');
    };
}

const inputLeft = document.getElementById('inputLeft');
const inputRight = document.getElementById('inputRight');
const checkBoxLeft = document.getElementById('modal-candidate-left');
const checkBoxRight = document.getElementById('modal-candidate-right');
checkBoxLeft.addEventListener('click',function(){
    checkAnother(inputRight);
    checkDouble(inputLeft);
});
checkBoxRight.addEventListener('click',function(){
    checkAnother(inputLeft);
    checkDouble(inputRight);
});


const isChecked = function(bool){
    if(bool){
        return 1;
    }else{
        return 0;
    }
}

document.getElementById('voteForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    //체크된 후보는 1, 아닌 후보는 0을 넘김
    const candidate_01 = isChecked(e.target.inputLeft.checked);
    const candidate_02 = isChecked(e.target.inputRight.checked);
    if(!(candidate_01 || candidate_02)){
        return alert('후보자를 선택하세요');
    }
    //선택된 전공의 majorId 값을 넘김
    const major = e.target.userMajor;
    const majorId = major.options[major.selectedIndex].value;
    try{
        await axios.post('/vote',{candidate_01,candidate_02,majorId});
        location.reload();
    }catch(err){
        console.error(err);
    }
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
        await axios.post('/comment',{userComment});
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
            this.objBtn.style.backgroundImage = 'url(image/heartBlue.png)';
        }else{
            this.objBtn.style.backgroundImage = 'url(image/heartRed.png)';
        }
    },
    changeLikeState : function(){
        if(this.state){
            this.state=false;
        }else{
            this.state=true;
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
    var likeBtnLeft_01 = new Like('pledgeLikeBtnLeft-01','pledgeLikeCountLeft-01');
    var likeBtnLeft_02 = new Like('pledgeLikeBtnLeft-02','pledgeLikeCountLeft-02');
    var likeBtnLeft_03 = new Like('pledgeLikeBtnLeft-03','pledgeLikeCountLeft-03');
    var likeBtnRight_01 = new Like('pledgeLikeBtnRight-01','pledgeLikeCountRight-01');
    var likeBtnRight_02 = new Like('pledgeLikeBtnRight-02','pledgeLikeCountRight-02');
    var likeBtnRight_03 = new Like('pledgeLikeBtnRight-03','pledgeLikeCountRight-03');
    if(likeBtnLeft_01.objBtn.className=='pledge-like-btn-red'){
        likeBtnLeft_01.changeLikeState();
    }
    if(likeBtnLeft_02.objBtn.className=='pledge-like-btn-red'){
        likeBtnLeft_02.changeLikeState();
    }
    if(likeBtnLeft_03.objBtn.className=='pledge-like-btn-red'){
        likeBtnLeft_03.changeLikeState();
    }
    if(likeBtnRight_01.objBtn.className=='pledge-like-btn-red'){
        likeBtnRight_01.changeLikeState();
    }
    if(likeBtnRight_02.objBtn.className=='pledge-like-btn-red'){
        likeBtnRight_02.changeLikeState();
    }
    if(likeBtnRight_03.objBtn.className=='pledge-like-btn-red'){
        likeBtnRight_03.changeLikeState();
    }
    likeBtnLeft_01.setCount(likeParsed[0].sum);
    likeBtnLeft_01.displayCount();
    likeBtnLeft_02.setCount(likeParsed[1].sum);
    likeBtnLeft_02.displayCount();
    likeBtnLeft_03.setCount(likeParsed[2].sum);
    likeBtnLeft_03.displayCount();
    likeBtnRight_01.setCount(likeParsed[3].sum);
    likeBtnRight_01.displayCount();
    likeBtnRight_02.setCount(likeParsed[4].sum);
    likeBtnRight_02.displayCount();
    likeBtnRight_03.setCount(likeParsed[5].sum);
    likeBtnRight_03.displayCount();
    
    let count = 0;
    let likeId = 0;
    let state = 0;
    likeBtnLeft_01.objBtn.addEventListener('click',async (e)=>{
        likeBtnLeft_01.setClickEvent();
        count = likeBtnLeft_01.getCount();
        likeId = 1;
        state = likeBtnLeft_01.state;
        try{
            await axios.post('/like',{likeId,count,state});
        }catch(err){
            console.error(err);
        }
    });
    likeBtnLeft_02.objBtn.addEventListener('click',async (e)=>{
        likeBtnLeft_02.setClickEvent();
        count = likeBtnLeft_02.getCount();
        likeId = 2;
        state = likeBtnLeft_02.state;
        try{
            await axios.post('/like',{likeId,count,state});
        }catch(err){
            console.error(err);
        }
    });
    likeBtnLeft_03.objBtn.addEventListener('click',async (e)=>{
        likeBtnLeft_03.setClickEvent();
        count = likeBtnLeft_03.getCount();
        likeId = 3;
        state = likeBtnLeft_03.state;
        try{
            await axios.post('/like',{likeId,count,state});
        }catch(err){
            console.error(err);
        }
    });
    likeBtnRight_01.objBtn.addEventListener('click',async (e)=>{
        likeBtnRight_01.setClickEvent();
        count = likeBtnRight_01.getCount();
        likeId = 4;
        state = likeBtnRight_01.state;
        try{
            await axios.post('/like',{likeId,count,state});
        }catch(err){
            console.error(err);
        }
    });
    likeBtnRight_02.objBtn.addEventListener('click',async (e)=>{
        likeBtnRight_02.setClickEvent();
        count = likeBtnRight_02.getCount();
        likeId = 5;
        state = likeBtnRight_02.state;
        try{
            await axios.post('/like',{likeId,count,state});
        }catch(err){
            console.error(err);
        }
    });
    likeBtnRight_03.objBtn.addEventListener('click',async (e)=>{
        likeBtnRight_03.setClickEvent();
        count = likeBtnRight_03.getCount();
        likeId = 6;
        state = likeBtnRight_03.state;
        try{
            await axios.post('/like',{likeId,count,state});
        }catch(err){
            console.error(err);
        }
    });

});




