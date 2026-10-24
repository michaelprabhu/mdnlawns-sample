document.documentElement.classList.add("js");

(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  function showAll() {
    items.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  try {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(el);
    });

    // Safety net: never leave content hidden.
    window.setTimeout(showAll, 2500);
  } catch (e) {
    showAll();
  }
})();
