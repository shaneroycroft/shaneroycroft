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
})();
