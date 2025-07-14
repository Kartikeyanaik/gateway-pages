// ConfigCard Web Component
const ConfigCardtemplate = document.createElement('template');
ConfigCardtemplate.innerHTML = `
    <style>
    :host {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 8px;
        padding: 1.8rem 1.5rem;
        color: #6C778B;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        font-family: 'Inter', sans-serif;
        box-sizing: border-box;
        height: 100%;
        margin: 0.5rem 1rem 1rem;
        overflow-y: auto;
    }

    .heading-and-status {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .heading {
        width: fit-content;
        font-family: 'Archivo', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 0.25rem;
        color: #303B54;
    }
    .subheading {
        width: fit-content;
        font-size: 1rem;
        color: #6C778B;
        margin: 0 0 1rem;
    }

    @media (max-width: 820px) {
        .heading-and-status {
            gap: 0.5rem;
        }
        .heading {
            font-size: 1.2rem;
        }
        .subheading {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 720px) {
        :host {
            padding: 1.5rem 1rem;
        }

        .heading-and-status {
            gap: 0.3rem;
        }

        .heading {
            font-size: 1rem;
        }

        .subheading {
            font-size: 0.67rem;
        }
    }

    @media (max-width: 640px) {
        .heading-and-status {
            gap: 1rem;
        }
        .heading {
            font-size: 1.5rem;
        }
        .subheading {
            font-size: 1rem;
        }
    }

    @media (max-width: 600px) {
        .heading-and-status {
            gap: 0.5rem;
        }
    }

    @media (max-width: 420px) {
        .heading-and-status {
            gap: 0.3rem;
        }
        .heading {
            font-size: 1.2rem;
        }
        .subheading {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 390px) {
        :host {
            padding: 1.5rem 0.9rem;
        }
        .heading {
            font-size: 1rem;
        }
        .subheading {
            font-size: 0.67rem;
        }
    }

    @media (max-width: 320px) {
        .heading {
            font-size: 0.8rem;
        }
        .subheading {
            font-size: 0.533rem;
        }
    }

    @media (max-width: 280px) {
        .heading {
            font-size: 0.6rem;
        }
        .subheading {
            font-size: 0.4rem;
        }
    }
    </style>
    <div class="header-row">
        <div class="heading-and-status">
            <div class="heading" id="heading"></div>
        </div>
    </div>
    <div class="subheading"></div>
    <slot></slot>
`;

class ConfigCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(ConfigCardtemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const headingText = this.getAttribute('heading');
    const subheadingText = this.getAttribute('subheading');

    const headingElement = this.shadowRoot.querySelector('.heading');
    const subheadingElement = this.shadowRoot.querySelector('.subheading');
    const slot = this.shadowRoot.querySelector('slot');
    const headerRow = this.shadowRoot.querySelector('.header-row');
    const haedindAndStatus = this.shadowRoot.querySelector('.heading-and-status');

    if (headingElement) headingElement.textContent = headingText || '';
    if (subheadingElement) subheadingElement.textContent = subheadingText || '';

    // Wait until slot is populated
    requestAnimationFrame(() => {
        const assignedNodes = slot.assignedNodes({ flatten: true });
        const status = assignedNodes.find(
            node => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'status-indicator'
        );
        if (status) {
        haedindAndStatus.appendChild(status);
        }

        if (window.innerWidth > 540) {
            const enable = assignedNodes.find(
                node => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'enable-button'
            );
            if (enable) {
            headerRow.appendChild(enable);
            }
        }
    });
  }
}

customElements.define('config-card', ConfigCard);