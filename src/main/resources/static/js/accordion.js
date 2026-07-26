// S,T,A,R 카드 내부 토글 (index.html 20곳에서 동일 로직 인라인으로 중복되던 것을 정리)
function toggleStarCard(headerEl) {
    const content = headerEl.nextElementSibling;
    const icon = headerEl.querySelector('.inner-arrow-icon');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

// 핵심 임팩트 태그 클릭 시 해당 My Contributions 아코디언으로 이동 후 펼침
function goToContribution(id) {
    const item = document.getElementById(id);
    if (!item) return;

    if (!item.classList.contains('active')) {
        toggleAccordion(id);
    }

    if (typeof scrollToTarget === 'function') {
        scrollToTarget(id);
    }
}

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