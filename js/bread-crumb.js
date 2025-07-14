import * as main from './main.js';

// Breadcrumb Web Component
const breadcrumbTemplate = document.createElement('template');
breadcrumbTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: sans-serif;
      padding: 0.5rem 1rem;
    }

    nav.breadcrumb {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      width: 100%;
    }

    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      color: #6C778B;
      text-decoration: none;
    }

    .breadcrumb-separator {
      display: flex;
      height: fit-content;
      font-size: 1.2rem;
      margin: 0rem 0.5rem;
      color: #6C778B;
    }

    @media (max-width: 280px) {
      :host {
        padding: 0.5rem 0.3rem;
      }

      nav.breadcrumb {
        font-size: 0.8rem;
      }
    }
  </style>
  <nav class="breadcrumb"></nav>
`;

class AppBreadcrumb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(breadcrumbTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const nav = this.shadowRoot.querySelector('nav.breadcrumb');
    nav.innerHTML = '';

    const filename = window.location.pathname.split('/').pop() || 'home.html';
    const trail = this._findTrail(main.items, filename) || [];

    // Ensure Home is always first
    const homeItem = main.items.find(i => i.link === 'home.html');
    const fullTrail = homeItem
      ? [homeItem, ...trail.filter(i => i !== homeItem)]
      : trail;

    fullTrail.forEach((item, idx) => {
      const crumb = document.createElement('span');
      crumb.className = 'breadcrumb-item';

      crumb.appendChild(document.createTextNode(item.label));
      nav.appendChild(crumb);

      if (idx < fullTrail.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb-separator';
        sep.textContent = '›';
        nav.appendChild(sep);
      }
    });
  }

  _findTrail(menu, target, trail = []) {
    for (const item of menu) {
      const newTrail = [...trail, item];
      if (item.link === target) return newTrail;
      if (item.submenu) {
        const result = this._findTrail(item.submenu, target, newTrail);
        if (result) return result;
      }
    }
    return null;
  }
}

customElements.define('bread-crumb', AppBreadcrumb);