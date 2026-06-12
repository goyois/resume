let currentSlideIdx = 0;

function changeSlide(direction) {
    const track = document.getElementById('imageTrack');
    const totalSlides = 2; // 총 이미지 개수

    // 안전 장치: 아코디언이 닫혀있거나 아직 이미지가 안 불려왔을 때 에러 방지
    if (!track) return;

    currentSlideIdx += direction;

    if (currentSlideIdx >= totalSlides) {
        currentSlideIdx = 0;
    } else if (currentSlideIdx < 0) {
        currentSlideIdx = totalSlides - 1;
    }

    track.style.transform = `translateX(-${currentSlideIdx * 50}%)`;
}