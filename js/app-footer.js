// AppFooter Web Component
const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `<style>
        :host {
            display: flex;
            flex: 1 1 auto;
            bottom: 0;
            background-color: #1e2a3c;
            color: #ffffff;
            font-family: sans-serif;
            width: 100%;
            margin: 0;
            padding: 0;
            position: relative;
            height: 2rem;
        }

        .footer {
            margin: 0;
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            padding: 0rem 1rem;
        }

        .footer p {
          color: #ffffff;
          font-size: 0.8rem;
          margin: 0;
        }

        @media (max-width: 390px) {
          .footer p {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 390px) {
          .footer p {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 280px) {
          .footer p {
            font-size: 0.55rem;
          }
        }
    </style>
    <footer class="footer">
        <p>Firmware Version: 100</p>
        <p id="current-time">Current Time: --:--:--</p>
    </footer>`

export class AppFooter extends HTMLElement {
  constructor() {
    super();

    // Attach Shadow DOM and clone the template for encapsulation
    this.attachShadow({ mode: 'open' })
      .appendChild(footerTemplate.content.cloneNode(true));

    this.timeEl = this.shadowRoot.getElementById('current-time');
    this._updateTime = this._updateTime.bind(this);
  }

  connectedCallback() {
    this._updateTime();                
    this._timerId = setInterval(this._updateTime, 1000);
  }

  disconnectedCallback() {
    clearInterval(this._timerId);
  }

  _updateTime() {
    const now = new Date();
    const Y = now.getFullYear();
    const M = String(now.getMonth() + 1).padStart(2, '0');
    const D = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    this.timeEl.textContent = `Current Time: ${Y}/${M}/${D} ${h}:${m}:${s}`;
  }
}

customElements.define('app-footer', AppFooter);
