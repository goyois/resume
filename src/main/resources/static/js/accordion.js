
    // 아코디언 토글 함수
    function toggleAccordion(id) {
        const item = document.getElementById(id);
        const isActive = item.classList.contains('active');


        if (isActive) {
                item.classList.remove('active'); // 이미 열려있다면 active 제거 (닫기)
            } else {
                item.classList.add('active');    // 닫혀있다면 active 추가 (열기)
            }

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


