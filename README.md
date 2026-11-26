# KerjaSiap Studio

## Run locally

Run `npm start`, then open `http://127.0.0.1:4173`. Components are loaded from
the `components/` directory, so the page needs to be served over HTTP instead
of opened directly as a `file://` URL. VS Code Live Server can also be used.

## Structure

- `components/`: sidebar, top bar, overlays, and one HTML file per toolkit module
- `assets/css/styles.css`: component styles
- `assets/css/design-system.css`: editorial palette, layout, and visual overrides
- `assets/js/model.js`: local-storage model
- `assets/js/view.js`: DOM and rendering helpers
- `assets/js/controller.js`: dashboard interactions
- `assets/js/component-loader.js`: loads page components before the controller
# kerjastudio
