
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let slideIndex = 0;
let curTranslate = 0;
let mySlides = Array.from(document.querySelectorAll(".slide"))
let mySwiper = document.querySelector(".slider-container");
let dots = document.getElementsByClassName("dot");

console.log(mySwiper);

nextButton.addEventListener("click", showNxtSlide);
prevButton.addEventListener("click", showPrvSlide);

window.addEventListener("resize", positionByIndex)

dots[slideIndex].className += " active";

function showNxtSlide() {
    
    console.log("!!!");
    
    slideIndex += 1;
    if (slideIndex > mySlides.length-1) {
        slideIndex = mySlides.length-1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    console.log("slideIndex = " + slideIndex);
    
    positionByIndex();
    dots[slideIndex].className += " active";
    console.log("dots" + slideIndex)
}


function showPrvSlide() {

    console.log("???");

    slideIndex -= 1;
    if (slideIndex < 0) {
        slideIndex = 0;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    console.log("slideIndex = " + slideIndex);
    
    positionByIndex();
    dots[slideIndex].className += " active";
}

function positionByIndex() {
  curTranslate = slideIndex * -window.innerWidth;

  console.log("curTranslate = " + curTranslate);

  setPosition();
}

function setPosition() {
    console.log("curTranslate = " + curTranslate);
    mySwiper.style.transform = `translateX(${curTranslate}px)`;
    console.log(mySwiper);
}

