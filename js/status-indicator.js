// StatusIndicator Web Component
const StatusIndicatorTemplate = document.createElement('template');
StatusIndicatorTemplate.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      font-family: "Inter", sans-serif;
    }

    .indicator {
      display: flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
      border-radius: 999px;
      font-weight: 500;
      background-color: #feebeb;
      color: #e40000;
      gap: 0.4rem;
    }

    .indicator.connected {
      background-color: #e6ffed;
      color: #2f855a;
    }

    .icon {
      width: 1rem;
      height: 1rem;
      display: inline-flex;
    }

    .icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media (max-width: 800px) {
      .indicator {
          font-size: 0.7rem;
      }
    }

    @media (max-width: 640px) {
      .indicator {
          font-size: 0.875rem;
      }
    }

    @media (max-width: 600px) {
      .indicator {
          font-size: 0.7rem;
      }
    }

    @media (max-width: 400px) {
      .indicator {
          font-size: 0.6rem;
      }

      .icon {
        width: 0.85rem;
        height: 0.85rem;
      }
    }

    @media (max-width: 320px) {
      .indicator {
          font-size: 0.5rem;
      }

      .icon {
        width: 0.75rem;
        height: 0.75rem;
      }
    }

    @media (max-width: 320px) {
      .indicator {
          font-size: 0.4rem;
      }

      .icon {
        width: 0.65rem;
        height: 0.65rem;
      }
    }
  </style>

  <div class="indicator" id="indicator">
    <span class="icon">
      <img src="assets/disconnected.svg" alt="Network status icon">
    </span>
    <span id="label">Disconnected</span>
  </div>
`;

class StatusIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(StatusIndicatorTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['status'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const indicator = this.shadowRoot.getElementById('indicator');
    const label = this.shadowRoot.getElementById('label');

    if (name === 'status') {
      if (newValue === 'connected') {
        indicator.classList.add('connected');
        label.textContent = 'Connected';
      } else {
        indicator.classList.remove('connected');
        label.textContent = 'Disconnected';
      }
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('status')) {
      this.setAttribute('status', 'disconnected'); // default
    }
  }
}

customElements.define('status-indicator', StatusIndicator);
