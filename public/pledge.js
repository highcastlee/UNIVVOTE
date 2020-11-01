const slideList = document.getElementById('slide-list');
const slideSection = document.getElementsByClassName('slide-section');
const slideLen = slideSection.length; // slide length
const slideWidth = 35; 
const slideSpeed = 200; 
const startNum = 0; 
slideList.style.width = slideWidth * (slideLen + 2) + "rem";
let curIndex = startNum; 


const slideBtnNext = document.getElementById('slideBtnNext');
const slideBtnPrev = document.getElementById('slideBtnPrev');

const nextSlide = function() {
    if (curIndex < slideLen - 1) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = `translate3d(-${slideWidth * (curIndex+1)}rem, 0px, 0px)`;

        curIndex++;

    }
}

const prevSlide = function(){
    if (curIndex > 0) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = `translate3d(-${slideWidth * (curIndex-1)}rem, 0px, 0px)`;

        curIndex--;
    }
};
slideBtnNext.addEventListener('click', nextSlide);
slideBtnPrev.addEventListener('click', prevSlide);

