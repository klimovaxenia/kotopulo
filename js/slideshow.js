
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

// Thumbnail image controls
function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

// show slide number n
function showSlides() {
    //let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    let text = document.getElementsByClassName("text");

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
  
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
  
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
  
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    for (i = 0; i < text.length; i++) {
        text[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    text[slideIndex-1].style.display = "inline";
}
