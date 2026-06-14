let currentSlide = 0;
const totalSlides = 3;

function changeSlide(direction) {
    currentSlide += direction;

    // 1. 마지막 이미지에서 '다음' 누르면 -> 처음(0)으로 이동
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    // 2. 첫 이미지에서 '이전' 누르면 -> 마지막으로 이동
    else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const imageTrack = document.getElementById('imageTrack');

    // HTML에서 트랙 너비가 300%이므로, 33.3333%씩 이동합니다.
    imageTrack.style.transform = `translateX(-${currentSlide * 33.3333}%)`;
}