// 상단 헤더 내비게이션과 푸터 바로가기가 공유하는 부드러운 스크롤 이동 로직
function scrollToTarget(targetClass) {
    const targetElement = document.querySelector(`.${targetClass}`) || document.querySelector(`#${targetClass}`);
    if (!targetElement) return;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset;

    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight + 12 : 70;

    window.scrollTo({
        top: offsetPosition - headerOffset,
        behavior: 'smooth'
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // =========================================================
    // 1. 상단 헤더 / 푸터 바로가기 클릭 이동 로직
    // =========================================================
    document.querySelectorAll('.scroll-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            scrollToTarget(link.getAttribute('data-target'));
        });
    });

    // =========================================================
    // 2. 상단 스크롤 진행바
    // =========================================================
    const bar = document.getElementById("scroll-progress-bar");

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        const height = scrollHeight - clientHeight;
        if (bar && height > 0) {
            const scrolled = (scrollPos / height) * 100;
            bar.style.width = scrolled + "%";
        }
    }, { passive: true });
});
