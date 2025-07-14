// ResetAndSaveButtons Web Component
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      align-items: center;
      justify-content: end;
      text-align: right;
      margin-top: auto;
    }

    .button-group {
        display: flex;
        align-items:center;
        gap: 1rem;
    }
    .btn {
      all: unset;
      cursor: pointer;
      font: inherit;
      padding: 0.5rem 1.2rem;
      border-radius: 6px;
      font-size: 0.875rem;
      user-select: none;
      touch-action: manipulation;
    }

    .btn-reset {
      border: 1px solid #D1D5DB;
      color: #303B54;
      background: white;
    }

    .btn-reset:hover {
      background: #f3f4f6;
    }

    .btn-save {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #FF7A00;
      color: white;
    }

    .btn-save:hover {
      background: #ea580c;
    }

    .btn:focus-visible {
      outline: 2px solid #3f84f8;
      outline-offset: 2px;
    }

    .btn-save img {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  </style>
  <div class="button-group">
    <button class="btn btn-reset">Reset</button>
    <button class="btn btn-save">
    <img src="assets/save.svg" alt="" aria-hidden="true" />
    <span>Save</span>
    </button>
  </div>
`;

class ResetAndSaveButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true));
  }
}

customElements.define('reset-and-save-buttons', ResetAndSaveButtons);