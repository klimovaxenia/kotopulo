
const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll(".dot"));

let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let touchDots = document.getElementsByClassName("dot");
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID,
    currentIndex = 0

// click events
nextButton.addEventListener("click", showNxtSlide);
prevButton.addEventListener("click", showPrvSlide);

slides.forEach((slide, index) => {
    
    const slideImage = slide.querySelector('img')
    
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    
    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
    
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

dots[currentIndex].className += " active";

// prevent menu popup on long press
//window.oncontextmenu = function (event) {
//  event.preventDefault()
//  event.stopPropagation()
//  return false
//}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function currentSlide(n) {
    currentIndex = n;
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    showSlide();
    dots[currentIndex].className += " active";
}

function showSlide() {

    console.log("dot index = " + currentIndex);
    setPositionByIndex();
}

function showNxtSlide() {
    
    console.log("!!!");
    
    currentIndex += 1;
    if (currentIndex > slides.length-1) {
        currentIndex = slides.length-1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    console.log("slideIndex = " + currentIndex);
    
    setPositionByIndex();
    dots[currentIndex].className += " active";
    console.log("dots" + currentIndex)
}


function showPrvSlide() {

    console.log("???");

    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    console.log("slideIndex = " + currentIndex);
    
    setPositionByIndex();
    dots[currentIndex].className += " active";
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function touchEnd() {
    for (i = 0; i < touchDots.length; i++) {
        touchDots[i].className = touchDots[i].className.replace(" active", "");
    }
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1;
    }

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
   
    console.log()

    setPositionByIndex()
    touchDots[currentIndex].className += " active";

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}


