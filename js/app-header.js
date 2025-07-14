// AppHeader Web Component
const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `<style>
        :host {
            background-color: #1e2a3c;
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }

        .header {
            position: relative;
            display: flex;
            justify-content: space-between;
            padding: 0.8rem 1rem;
          }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo-icon {
            height: fit-content;
            background-color: #FF7A00;
            padding: 0.65rem 0.8rem;
            border-radius: 0.25rem;
            font-weight: bold;
            color: #ffffff; 
        }

        .title-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: fit-content;
          gap: 0.2rem;
        }

        .title {
            font-weight: 700;
            color: #ffffff;
        }

        .subtitle {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .status {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            color: #fff;
            position: relative;
        }

        .status::before {
          content: '';
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background-color: limegreen;
          display: inline-block;
          margin-right: 0.5rem;
          margin-bottom: 0.05rem;
        }

        .logout-button img {
          width: 1.1rem;
          height: 1.1rem;
        }

        .logout-button {
            background-color: #d32f2f;
            color: #ffffff;
            border: none;
            padding: 0.5rem 0.8rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }

        button:hover {
            background-color: #b71c1c;
        }

        @media (max-width: 480px) {
          .title {
          font-size: 0.7rem;
          }

          .subtitle {
          font-size: 0.55rem;
          }

        @media (max-width: 390px) {
          .actions {
            gap: 1rem;
          }

          .status {
            font-size: 0.7rem;
         }
        }

        @media (max-width: 360px) {
          .header {
            padding: 0.8rem 0.5rem;
          }

          .logout-button img {
            width: 0.9rem;
            height: 0.9rem;
          }

          .logout-button {
            padding: 0.5rem 0.8rem;
            font-size: 0.7rem;
            gap: 0.5rem;
          }
        }

        @media (max-width: 320px) {
          .actions {
            gap: 0.5rem;
          }
          .logo-icon {
            padding: 0.5rem 0.615rem;
          }
        }

        @media (max-width: 280px) {
          .logo {
            gap: 0.4rem;
          }

          .logo-icon {
            padding: 0.4rem 0.492rem;
          }

          .logout-button {
            padding: 0.4rem 0.4rem;
            font-size: 0.6rem;
            gap: 0rem;
          }
        }
    </style>
    <header class="header">
        <div class="logo">
            <div class="logo-icon">M</div>
            <div class="title-group">
              <span class="title">Meshnet Electronics</span>
              <span class="subtitle">Meerkat Edge IIoT Gateway</span>
            </div>
        </div>
        <div class="actions">
            <span class="status">Offline</span>
            <button class="logout-button"><img src="assets/logout.svg"></img>Logout</button>
        </div>
    </header>`

export class AppHeader extends HTMLElement {
  constructor() {
    super();

    // Attach Shadow DOM and clone the template for encapsulation
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    // Cache root elements for later updates
    this.statusElement = shadowRoot.querySelector('.status');
    this.logoutButton = shadowRoot.querySelector('button');
  }

  // Monitor changes to these attributes and reflect them in the UI
  static get observedAttributes() {
    return ['status'];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'status') {
      const element = this.shadowRoot.querySelector('.status');
      if (element) {element.textContent = newValue;}
    }
  }

  connectedCallback() {
    // Listen for clicks on the logout button and emit a custom event
    if (this.logoutButton)
      {this.logoutButton.addEventListener('click', () => {
          window.location.href='index.html';
      });
    }
  }
}

// Register the custom element for use in HTML
customElements.define('app-header', AppHeader);