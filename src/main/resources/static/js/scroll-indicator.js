document.addEventListener("DOMContentLoaded", function() {
    // =========================================================
    // 1. 우측 사이드 네비게이션 클릭 이동 로직
    // =========================================================
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetClass = item.getAttribute('data-target');
            const targetElement = document.querySelector(`.${targetClass}`) || document.querySelector(`#${targetClass}`);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset;

                let headerOffset = 70;

                if (targetClass === 'tech-stack-section') {
                    headerOffset = 10;
                } else if (targetClass === 'site-footer') {
                    headerOffset = 0;
                }

                window.scrollTo({
                    top: offsetPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================
    // 2. 스크롤 감지 로직 (자동화 버전 적용 🌟)
    // =========================================================
    const bar = document.getElementById("scroll-progress-bar");
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        let current = "";

        // 🌟 핵심 수정: HTML에 있는 data-target 값을 자동으로 모두 수집합니다.
        // 이제 JS에 섹션 이름을 일일이 적어줄 필요가 없습니다!
        const sections = Array.from(navItems).map(item => item.getAttribute('data-target'));

        const isAtBottom = Math.ceil(scrollPos + clientHeight) >= (scrollHeight - 5);

        if (isAtBottom) {
            // 바닥에 닿으면 네비게이션의 가장 마지막 항목을 활성화
            current = sections[sections.length - 1];
        } else {
            sections.forEach(section => {
                const element = document.querySelector(`.${section}`) || document.querySelector(`#${section}`);
                if (element) {
                    const sectionTop = element.offsetTop;
                    const sectionHeight = element.clientHeight;
                    // 섹션 중간쯤 도달했을 때 불 켜기
                    if (scrollPos >= (sectionTop - sectionHeight / 3)) {
                        current = section;
                    }
                }
            });
        }

        // 네비게이션 아이템에 불빛(active) 업데이트
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === current) {
                item.classList.add('active');
            }
        });

        // --- B. 상단 파스텔 스크롤 바 진행도 업데이트 ---
        const height = scrollHeight - clientHeight;
        if (height > 0) {
            const scrolled = (scrollPos / height) * 100;
            if (bar) bar.style.setProperty("width", scrolled + "%", "important");

            // --- C. 별빛 생성 로직 ---
            const scrollDiff = Math.abs(scrollPos - lastScrollTop);
            if (scrollDiff > 2 && Math.random() > 0.3) {
                createStardust(scrolled);
            }
        }
        lastScrollTop = scrollPos;
    }, true);

    // =========================================================
    // 3. 별빛(Stardust) 파티클 생성 함수
    // =========================================================
    function createStardust(currentPercentage) {
        const star = document.createElement('div');
        star.className = 'stardust';

        const randomOffsetX = (Math.random() - 0.5) * 1.5;
        star.style.left = `calc(${currentPercentage}% + ${randomOffsetX}%)`;

        const duration = Math.random() * 0.7 + 0.5;
        const drift = (Math.random() - 0.5) * 40;

        star.style.animationDuration = duration + 's';
        star.style.setProperty('--drift', drift);

        document.body.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }
});

// =========================================================
// 4. 푸터 네비게이션 클릭 시 부드러운 스크롤 이동 로직
// =========================================================
document.addEventListener("DOMContentLoaded", function() {
    const footerLinks = document.querySelectorAll('.footer-nav-link');

    footerLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetClass = link.getAttribute('data-target');
            const targetElement = document.querySelector(`.${targetClass}`) || document.querySelector(`#${targetClass}`);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset;

                // 우측 사이드바와 동일한 여백 설정
                let headerOffset = 70;
                if (targetClass === 'tech-stack-section') {
                    headerOffset = 10;
                } else if (targetClass === 'site-footer') {
                    headerOffset = 0;
                }

                window.scrollTo({
                    top: offsetPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});