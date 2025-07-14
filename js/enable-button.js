// EnableButton Web Component
const enableButtonTemplate = document.createElement('template');
enableButtonTemplate.innerHTML = `
  <style>
    :host {
      display: flex;
      align-items: center;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      position: relative;
      margin-left: auto;
    }
    .enable-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .toggle {
      position: relative;
      height: 1.5rem;
      width: 2.75rem;
      display: inline-block;
    }
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      display: flex;
      align-items: center;
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: #bcc1ca;
      padding: 0.1rem;
      border-radius: 0.75rem;
      transition: background-color 0.2s;
    }
    .slider::before {
      content: "";
      position: absolute;
      height: 1.25rem;
      width: 1.25rem;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.2s;
    }
    input:checked + .slider {
      background-color: #FF7A00;
    }
    input:checked + .slider::before {
      transform: translateX(100%);
    }
    input:focus + .slider {
      box-shadow: 0 0 2px 2px rgba(63, 132, 248, 0.6);
    }
    .label {
      font-size: 0.875rem;
      color: #303B54;
      margin-top: 0.15rem;
    }

    @media (max-width: 850px) {
      .enable-button {
        gap: 0.5rem;
      }
    }

    @media (max-width: 800px) {
      .label {
        font-size: 0.75rem;
        margin-top: 0.1rem;
      }

      .toggle {
        height: 1.2rem;
        width: 2.2rem;
      }

      .slider::before {
        height: 1rem;
        width: 1rem;
      }
    }

    @media (max-width: 640px) {
      .enable-button {
        gap: 1rem;
      }

      .label {
        font-size: 0.875rem;
        margin-top: 0.15rem;
      }

      .toggle {
        height: 1.5rem;
        width: 2.75rem;
      }

      .slider::before {
        height: 1.25rem;
        width: 1.25rem;
      }
    }

    @media (max-width: 375px) {
      .label {
        font-size: 0.75rem;
        margin-top: 0.1rem;
      }

      .toggle {
        height: 1.2rem;
        width: 2.2rem;
      }

      .slider::before {
        height: 1rem;
        width: 1rem;
      }
    }

    @media (max-width: 280px) {
      .label {
        font-size: 0.6rem;
        margin-top: 0.1rem;
      }

      .toggle {
        height: 1.1rem;
        width: 1.834rem;
      }

      .slider::before {
        height: 0.833rem;
        width: 0.833rem;
      }
    }
  </style>
  <label class="enable-button">
    <span class="label"><slot>Enable</slot></span>
    <div class="toggle">
      <input type="checkbox" />
      <span class="slider"></span>
    </div>
  </label>
`;

class EnableButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .appendChild(enableButtonTemplate.content.cloneNode(true));
    this._input = this.shadowRoot.querySelector('input');
  }
  get checked() {
    return this._input.checked;
  }
  set checked(val) {
    this._input.checked = Boolean(val);
  }
  connectedCallback() {
    if (this.hasAttribute('checked')) {
      this._input.checked = true;
    }
  }
}

customElements.define('enable-button', EnableButton);