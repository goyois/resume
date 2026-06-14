function toggleAccordion(id) {
    const item = document.getElementById(id);
    if (!item) return;

    const isActive = item.classList.contains('active');

    if (isActive) {
        // 메인 아코디언을 닫을 때
        item.classList.remove('active');
    } else {
        // 메인 아코디언을 열 때
        item.classList.add('active');

        // 현재 열린 메인 아코디언(item) 내부의 S,T,A,R 콘텐츠를 모두 찾음
        const innerContents = item.querySelectorAll('.inner-accordion-content');

        innerContents.forEach(content => {
            // 내부 콘텐츠 강제 열기
            content.style.display = 'block';

            // 가장 가까운 카드 테두리(부모)를 찾아 화살표 아이콘 회전
            const card = content.parentElement;
            if (card) {
                const icon = card.querySelector('.inner-arrow-icon');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    }
}