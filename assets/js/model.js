(() => {
  const app = (window.KerjaSiap = window.KerjaSiap || {});

  app.Model = Object.freeze({
    createStorage(prefix) {
      return (key, value) => {
        try {
          if (value === undefined) {
            return JSON.parse(localStorage.getItem(prefix + key));
          }

          localStorage.setItem(prefix + key, JSON.stringify(value));
        } catch {
          return null;
        }
      };
    },
  });
})();
