(() => {
  const componentFiles = [
    ["app-sidebar", "components/sidebar.html"],
    ["app-topbar", "components/topbar.html"],
    ["app-overlays", "components/overlays.html"],
  ];
  const moduleFiles = Array.from(
    { length: 9 },
    (_, index) => `components/modules/module-${String(index + 1).padStart(2, "0")}.html`,
  );
  const scriptFiles = [
    "assets/js/model.js",
    "assets/js/view.js",
    "assets/js/controller.js",
  ];

  async function getFragment(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not load ${url}: HTTP ${response.status}`);
    }

    const template = document.createElement("template");
    template.innerHTML = await response.text();
    return template.content;
  }

  async function mountComponent(targetId, url) {
    const target = document.getElementById(targetId);
    if (!target) {
      throw new Error(`Component mount point #${targetId} was not found`);
    }

    target.replaceWith(await getFragment(url));
  }

  async function mountModules() {
    const target = document.getElementById("app-modules");
    if (!target) {
      throw new Error("Component mount point #app-modules was not found");
    }

    const fragments = await Promise.all(moduleFiles.map(getFragment));
    const modules = document.createDocumentFragment();
    fragments.forEach((fragment) => modules.append(fragment));
    target.replaceWith(modules);
  }

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Could not load ${url}`));
      document.body.append(script);
    });
  }

  async function initialize() {
    await Promise.all([
      ...componentFiles.map(([targetId, url]) => mountComponent(targetId, url)),
      mountModules(),
    ]);

    for (const script of scriptFiles) {
      await loadScript(script);
    }
  }

  initialize().catch((error) => {
    console.error("KerjaSiap components could not be initialized.", error);
    const message = document.createElement("p");
    message.className = "component-error";
    message.setAttribute("role", "alert");
    message.textContent =
      "Komponen gagal dimuat. Jalankan aplikasi lewat server lokal (npm start atau VS Code Live Server).";
    document.body.prepend(message);
  });
})();
