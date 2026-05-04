
    // 아코디언 토글 함수
    function toggleAccordion(id) {
        const item = document.getElementById(id);
        const isActive = item.classList.contains('active');

        // 다른 열려있는 아코디언 닫기 (선택 사항)
        document.querySelectorAll('.accordion-item').forEach(el => {
            el.classList.remove('active');
        });

        // 현재 클릭한 것 토글
        if (!isActive) {
            item.classList.add('active');
        }
    }

    window.onload = function() {
        if (window.location.hash) {
            history.replaceState('', document.title, window.location.pathname + window.location.search);
            window.scrollTo(0, 0);
        }
    };
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }


