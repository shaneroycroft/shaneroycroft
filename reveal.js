(function () {
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.07 });

    function observe() {
        document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observe);
    else observe();

    window.revealObserve = function (el) { io.observe(el); };
})();
