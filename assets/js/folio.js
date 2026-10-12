// Reading folio: "page x of y" at the foot of an article, where a page is one screenful.
(function () {
    var folio = document.getElementById('folio');
    if (!folio) return;
    var n = folio.querySelector('[data-n]');
    var t = folio.querySelector('[data-t]');
    var queued = false;

    function update() {
        queued = false;
        var vh = window.innerHeight;
        var total = Math.max(1, Math.ceil(document.documentElement.scrollHeight / vh));
        var page = Math.min(total, Math.floor((window.scrollY + vh / 2) / vh) + 1);
        n.textContent = page;
        t.textContent = total;
    }

    function queue() {
        if (!queued) { queued = true; window.requestAnimationFrame(update); }
    }

    folio.hidden = false;
    document.body.classList.add('has-folio');
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
})();
