    document.addEventListener("DOMContentLoaded", function() {
        const bar = document.getElementById("scroll-progress-bar");
        let lastScrollTop = 0;

        window.addEventListener('scroll', function(e) {
            const target = (e.target === document) ? document.documentElement : e.target;

            const scrollTop = target.scrollTop || window.scrollY || 0;
            const scrollHeight = target.scrollHeight || 0;
            const clientHeight = target.clientHeight || window.innerHeight || 0;
            const height = scrollHeight - clientHeight;

            if (height > 0) {
                const scrolled = (scrollTop / height) * 100;
                bar.style.setProperty("width", scrolled + "%", "important");

                // 🌟 별빛 생성 로직 (스크롤을 내리거나 올릴 때 일정 확률로 생성)
                // 스크롤 속도가 빠를수록 더 많이 생기도록 차이값 계산
                const scrollDiff = Math.abs(scrollTop - lastScrollTop);

                // 너무 많이 생겨서 버벅이지 않도록 확률 및 개수 조절
                if (scrollDiff > 2 && Math.random() > 0.3) {
                    createStardust(scrolled);
                }
            }
            lastScrollTop = scrollTop;
        }, true);

        // 별빛 조각을 DOM에 추가하는 함수
        function createStardust(currentPercentage) {
            const star = document.createElement('div');
            star.className = 'stardust';

            // 위치 설정 (진행도 % 기준 + 약간의 랜덤 오차를 줘서 자연스럽게 흩뿌림)
            const randomOffsetX = (Math.random() - 0.5) * 1.5;
            star.style.left = `calc(${currentPercentage}% + ${randomOffsetX}%)`;

            // 별빛마다 떨어지는 속도(0.5초 ~ 1.2초)와 좌우로 날리는 방향 랜덤 설정
            const duration = Math.random() * 0.7 + 0.5;
            const drift = (Math.random() - 0.5) * 40; // 좌우로 -20px ~ 20px 랜덤 이동

            star.style.animationDuration = duration + 's';
            star.style.setProperty('--drift', drift);

            document.body.appendChild(star);

            // 애니메이션이 끝나면 DOM에서 삭제 (메모리 누수 방지)
            setTimeout(() => {
                star.remove();
            }, duration * 1000);
        }
    });
