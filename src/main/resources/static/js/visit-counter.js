(function () {
    const STORAGE_KEY = "portfolio_last_visit_date";
    const todayEl = document.getElementById("visit-today-count");
    const totalEl = document.getElementById("visit-total-count");

    if (!todayEl || !totalEl) {
        return;
    }

    function todayString() {
        const now = new Date();
        return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
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

    const today = todayString();
    const alreadyCounted = localStorage.getItem(STORAGE_KEY) === today;
    const method = alreadyCounted ? "GET" : "POST";

    fetch("/api/visits", { method: method })
        .then((res) => res.json())
        .then((stats) => {
            if (!alreadyCounted) {
                localStorage.setItem(STORAGE_KEY, today);
            }
            render(stats);
        })
        .catch(() => {
            todayEl.textContent = "-";
            totalEl.textContent = "-";
        });
})();
