(function () {
    const todayEl = document.getElementById("visit-today-count");
    const totalEl = document.getElementById("visit-total-count");

    if (!todayEl || !totalEl) {
        return;
    }

    function render(stats) {
        if (window.animateCountUp) {
            window.animateCountUp(todayEl, Number(stats.today), { duration: 900 });
            window.animateCountUp(totalEl, Number(stats.total), { duration: 1200 });
        } else {
            todayEl.textContent = Number(stats.today).toLocaleString();
            totalEl.textContent = Number(stats.total).toLocaleString();
        }
    }

    // "오늘 이미 카운트했는지"는 서버가 쿠키(KST 기준 날짜)로 판단하므로
    // 클라이언트는 항상 같은 요청만 보내면 된다.
    fetch("/api/visits", { method: "POST" })
        .then((res) => res.json())
        .then(render)
        .catch(() => {
            todayEl.textContent = "-";
            totalEl.textContent = "-";
        });
})();
