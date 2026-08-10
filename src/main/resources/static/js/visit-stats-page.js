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

    // 통계만 보여주는 페이지이므로 GET으로 조회만 하고 카운트는 올리지 않는다.
    fetch("/api/visits", { method: "GET" })
        .then((res) => res.json())
        .then(render)
        .catch(() => {
            todayEl.textContent = "-";
            totalEl.textContent = "-";
        });
})();
