
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
            voteModal.closeModal();
        }else if(i==1){
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

// const leftCount = new calculater(candidateLeftCount,sum);
// const rightCount = new calculater(candidateRightCount,sum);
// leftPercent = leftCount.calcPercent();
// rightPercent = rightCount.calcPercent();
// // console.log(leftPercent);

// window.addEventListener('load',function(){

// });
// JSON으로 득표 수 각각 받아서 입력

let voteInfo, voteParsed, candidateLeftCount, candidateRightCount =0;
var req = new XMLHttpRequest();
var jsonObj;
req.responseType = 'text';
req.open("GET","voteInfo.json",true);
req.send(null);
req.addEventListener("load",function(){
    jsonObj = req.responseText;
    // console.log(jsonObj);
    voteInfo = jsonObj;
    voteParsed = JSON.parse(voteInfo);
    candidateLeftCount = voteParsed.candidate_01;
    candidateRightCount = voteParsed.candidate_02;
    let sum = candidateLeftCount + candidateRightCount;
    
    let leftCount = new calculater(candidateLeftCount,sum);
    let rightCount = new calculater(candidateRightCount,sum);
    let leftPercent = leftCount.calcPercent();
    let rightPercent = rightCount.calcPercent();
    
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
    this.count = 0;
    this.isLiked = false;
    return;
}

Like.prototype={
    getCount : function(){return this.count;},
    setCount : function(x){this.count = x;},
    getIsLiked : function(){return this.isLiked;},
    setClickEvent : function(){
        this.changeLikeBtn();
        this.changeLikeCount();
        this.changeLikeState();
    },
    changeLikeCount : function(){
        if(this.isLiked){
            this.objCount.textContent=--this.count;
        }else{
            this.objCount.textContent=++this.count;
        }
    },
    changeLikeBtn : function(){
        if(this.isLiked){
            this.objBtn.style.backgroundImage = 'url(image/heartBlue.png)';
        }else{
            this.objBtn.style.backgroundImage = 'url(image/heartRed.png)';
        }
    },
    changeLikeState : function(){
        if(this.isLiked){
            this.isLiked=false;
        }else{
            this.isLiked=true;
        }
    }
}

var likeBtnLeft_01 = new Like('pledgeLikeBtnLeft-01','pledgeLikeCountLeft-01');
var likeBtnLeft_02 = new Like('pledgeLikeBtnLeft-02','pledgeLikeCountLeft-02');
var likeBtnLeft_03 = new Like('pledgeLikeBtnLeft-03','pledgeLikeCountLeft-03');

var likeBtnRight_01 = new Like('pledgeLikeBtnRight-01','pledgeLikeCountRight-01');
var likeBtnRight_02 = new Like('pledgeLikeBtnRight-02','pledgeLikeCountRight-02');
var likeBtnRight_03 = new Like('pledgeLikeBtnRight-03','pledgeLikeCountRight-03');



likeBtnLeft_01.objBtn.addEventListener('click',function(){ 
    likeBtnLeft_01.setClickEvent();
});
likeBtnLeft_02.objBtn.addEventListener('click',function(){ 
    likeBtnLeft_02.setClickEvent();
});
likeBtnLeft_03.objBtn.addEventListener('click',function(){
    likeBtnLeft_03.setClickEvent();
});
likeBtnRight_01.objBtn.addEventListener('click',function(){
    likeBtnRight_01.setClickEvent();
});
likeBtnRight_02.objBtn.addEventListener('click',function(){ 
    likeBtnRight_02.setClickEvent();
});
likeBtnRight_03.objBtn.addEventListener('click',function(){
    likeBtnRight_03.setClickEvent();
});




