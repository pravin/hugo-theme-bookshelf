// Light/dark toggle ("Lamp off" / "Lamp on"). The saved choice is applied early by an
// inline script in <head>; without one, the OS preference (prefers-color-scheme) is used.
(function () {
    var buttons = document.querySelectorAll('#theme-toggle');
    if (!buttons.length) return;

    function current() {
        var theme = document.documentElement.dataset.theme;
        if (theme === 'light' || theme === 'dark') return theme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function label() {
        var text = current() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        buttons.forEach(function (b) { b.setAttribute('aria-label', text); b.title = text; });
    }

    buttons.forEach(function (b) {
        b.addEventListener('click', function () {
            var next = current() === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            try { localStorage.setItem('theme', next); } catch (e) {}
            label();
        });
    });

    label();
})();
