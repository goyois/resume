(function () {
    function easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    }

    function animateCountUp(el, target, options) {
        options = options || {};
        const duration = options.duration || 900;
        const suffix = options.suffix || "";
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.round(target * easeOutQuad(progress));
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    window.animateCountUp = animateCountUp;

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-count-to]").forEach((el) => {
            const target = Number(el.dataset.countTo);
            const suffix = el.dataset.suffix || "";
            animateCountUp(el, target, { suffix: suffix });
        });
    });
})();
