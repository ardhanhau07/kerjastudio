(() => {
  const app = (window.KerjaSiap = window.KerjaSiap || {});

  app.View = Object.freeze({
    create(documentRef) {
      return {
        $: (selector) => documentRef.querySelector(selector),
        $$: (selector) => [...documentRef.querySelectorAll(selector)],
      };
    },

    escapeHTML(value) {
      return String(value ?? "").replace(/[&<>"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[character]);
    },
  });
})();
