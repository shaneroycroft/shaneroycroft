(function () {
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                var img = e.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    if (img.complete && img.naturalWidth) img.classList.add('loaded');
                }
                io.unobserve(img);
            }
        });
    }, { rootMargin: '400px' });

    window.lazyLoad = function (img) { io.observe(img); };
})();
