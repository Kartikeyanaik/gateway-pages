// ToastContainer Web Component
const toastTemplate = document.createElement('template');
toastTemplate.innerHTML = `
  <style>
    :host {
      position: fixed;
      bottom: 0.2rem;
      right: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0.1rem;
      z-index: 1000;
    }

    .toast {
      width: 350px;
      min-height: 80px;
      max-width: 93vw;
      background: #0c2130;
      color: #ffffff;
      font-weight: 500;
      margin: 5px 0;
      box-shadow: 0 0 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      position: relative;
      transform: translateX(100%);
      animation: slide-in 0.5s forwards;
      border-radius: 4px;
      overflow: hidden;
    }

    @keyframes slide-in {
      to { transform: translateX(0); }
    }

    .toast::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 5px;
      animation: progress 4s linear forwards;
      width: 100%;
    }

    @keyframes progress { 
      to { width: 0; } 
    }

    .toast-icon {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0 10px;
    }

    .toast-message {
      flex: 1;
      color: #ffffff;
      font-weight: 500;
      word-break: break-all;
      padding-right: 0.3rem;
      padding: 0.5rem 0.35rem 0.5rem 0rem;
    }

    .toast-success::after { 
      background: green; 
    }

    .toast-fail::after { 
      background: red; 
    }
  </style>
  <div id="list"></div>
`;

class ToastContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'}).append(toastTemplate.content.cloneNode(true));
    this.list = this.shadowRoot.getElementById('list');
  }

  show(type, htmlContent, duration = 4000) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    // add a type-specific class for styling
    toast.classList.add(type === 'success' ? 'toast-success' : 'toast-fail');

    // create icon image
    const img = document.createElement('img');
    img.src = type === 'success' 
      ? 'assets/correct.svg' 
      : 'assets/wrong.svg';
    img.alt = type;
    img.classList.add('toast-icon');

    // create message wrapper
    const msg = document.createElement('div');
    msg.classList.add('toast-message');
    msg.innerHTML = htmlContent;
    
    // assemble toast
    toast.appendChild(img);
    toast.appendChild(msg);
    this.list.appendChild(toast);

    // auto-remove after duration
    setTimeout(() => { toast.remove(); }, duration);
  }
}

customElements.define('toast-container', ToastContainer);

export function showToast(type, html) {
  const toastContainer = document.querySelector('toast-container');
  if (toastContainer) toastContainer.show(type, html);
}