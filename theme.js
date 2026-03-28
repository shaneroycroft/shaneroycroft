// Theme toggle — reads/writes localStorage, applies data-theme to <html>
// Anti-FOUC: inline script in <head> applies saved theme before CSS renders

(function () {
    function isDark() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function apply(dark) {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }

    function updateIcon() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        btn.textContent = isDark() ? '○' : '●';
        btn.title = isDark() ? 'switch to light' : 'switch to dark';
    }

    window.toggleTheme = function () {
        const dark = !isDark();
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        apply(dark);
        updateIcon();
    };

    // Apply on load
    apply(isDark());

    // Sync icon once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateIcon);
    } else {
        updateIcon();
    }

    // Keep in sync with OS changes (when no manual override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!localStorage.getItem('theme')) {
            apply(isDark());
            updateIcon();
        }
    });

    // ── Page transitions ──────────────────────────────────
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:var(--bg);z-index:99998;opacity:1;pointer-events:none;transition:opacity 0.15s ease;';
    document.body.appendChild(overlay);

    // Fade in on arrival
    requestAnimationFrame(() => requestAnimationFrame(() => { overlay.style.opacity = '0'; }));

    // Fade out on departure
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a');
        if (!link || !link.href) return;
        if (link.target === '_blank') return;
        if (link.origin !== location.origin) return;
        if (link.href === location.href) return;
        e.preventDefault();
        const dest = link.href;
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        setTimeout(() => { window.location.href = dest; }, 140);
    });
})();
