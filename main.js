
var mainTitle = document.getElementById('main-title');
mainTitle.addEventListener('click',function(){
    location.reload();
})
//새로고침 시, 양식제출 물음 무시
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

var openModal = function(id) {
    let modal = document.getElementById(id);
    modal.setAttribute("style","display:block; z-Index:999; animation: modal-fadein 1s;");
}

var closeModal = function(id,fadeout){
    let modal = document.getElementById(id);
    if(fadeout==true){
        modal.setAttribute("style","display:block; z-Index:999; animation: modal-fadeout 1.3s;")
        setTimeout(function(){
            modal.setAttribute("style","display:none;");
        },1000);
    }else if(fadeout==false){
        modal.setAttribute("style","display:none;");
    };
};

const sharingBtn = document.getElementById("sharingIcon");
sharingBtn.addEventListener('click',function(){
    openModal('urlModal');
    CopyUrlToClipboard();
    setTimeout(function(){
        closeModal('urlModal',true);
    },1500);
});


const voteBtn = document.getElementById("voteBtn");
voteBtn.addEventListener('click',function(){
    openModal('voteModal');
});



const backIcon = document.getElementById('backIconBox');
backIcon.addEventListener('click',function(){
    closeModal('voteModal',false);
});

var urlText = document.getElementById("urlText");
urlText.value = window.document.location.href;

var CopyUrlToClipboard = function (){
	urlText.select();  // 해당 값이 선택되도록 select() 합니다
	document.execCommand("copy"); // 클립보드에 복사합니다.
    urlText.blur(); // 선택된 것을 다시 선택안된것으로 바꿈니다.
};



const submitButton = document.getElementById('voteForm');
submitButton.addEventListener('submit',function(e){
    // alert("꼭 오프라인 투표로 소중한 한 표를 행사해주세요!");
    // e.preventDefault();
});

var checkSelf = function(obj){
    if(obj.getAttribute('checked')=='true'){
        obj.removeAttribute('checked');
    }else{
        obj.setAttribute('checked','true');
    }
};

var checkOther = function(obj){
    if(obj.getAttribute('checked')=='true'){
        obj.removeAttribute('checked');
    };
}

const inputLeft = document.getElementById('inputLeft');
const inputRight = document.getElementById('inputRight');
const checkBoxLeft = document.getElementById('modal-candidate-left');
const checkBoxRight = document.getElementById('modal-candidate-right');
checkBoxLeft.addEventListener('click',function(){
    checkOther(inputRight);
    checkSelf(inputLeft);
});
checkBoxRight.addEventListener('click',function(){
    checkOther(inputLeft);
    checkSelf(inputRight);
});





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
// numberCounter 2번째 인수에 JSON으로 투표 비율 받아서 입력
window.addEventListener('load',function(){
    new numberCounter("percentLeft", 45.7, 1.1,true);
    new numberCounter("percentRight", 47.8, 1.1,true);
    new numberCounter("countLeft",3765, 53, false);
    new numberCounter("countRight",3765, 53, false);
});