import * as main from './main.js';
import { showToast } from './toast-container.js';

// AppNavbar Web Component
const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      flex: 0 0 auto;
      background-color: #2A3851;
      color: #9CA3AF;
      font-family: sans-serif;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      justify-content: space-between;
      overflow-y: auto;
    }

    nav {
      flex: 1 1 auto;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 0.6rem 0.5rem;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.3s;
      font-size: 0.9rem;
      border-radius: 0.25rem;
      gap: 0.8rem;
    }

    .menu-item:hover {
      background-color: #FF7A00;
      color: #ffffff;
    }

    .menu-item img {
      width: 1rem;
      height: 1rem;
      margin-right: 0.1rem;
    }

    .submenu {
      display: none;
      flex-direction: column;
      gap: 0.3rem;
      padding-left: 2rem;
    }

    .submenu-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 0.25rem;
      transition: background 0.2s;
      font-size: 0.9rem;
    }

    .submenu-item:hover {
      background: #FF7A00;
      color: #ffffff;
    }

    .expand-icon {
      display: inline-block;
      margin-left: auto;
      height: 0.7rem; 
      background: currentColor;
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
      mask:
        conic-gradient(
          from -30deg at 50% calc(200% - 3*var(--r)/2),
          #000 60deg, transparent 0
        ) 0 100%/100% calc(100% - 3*var(--r)/2) no-repeat,
        radial-gradient(var(--r) at 50% calc(2*var(--r)), #000 98%, transparent 101%),
        radial-gradient(var(--r), #000 98%, transparent 101%);
      --r: 0.05rem;
      transition: transform 0.3s;
      transform: rotate(180deg);
    }

    .expanded > .expand-icon {
      transform: rotate(360deg);
    }

    .reboot-container {
      display: flex;
      flex: 0 0 auto;
      padding: 0;
      background: #2A3851;
      min-width: 12rem;
    }

    .reboot-button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0rem;
      background-color: #FF7A00;
      color: white;
      padding: 0.5rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.9rem;
      border: none;
    }

    .reboot-button:hover {
      background: #ea580c;
    }

    .reboot-button img {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
    }

    .menu-button {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.2rem;
    }

    @media (max-width: 640px) {
      :host{
      flex-direction: column;
      width: 100%;
      align-items: center;
      max-height: fit-content;
      }

      .menu-button {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        color: #ffffff;
      }

      .menu-button img {
        width: 1rem;
        height: 1rem;
        margin-left: 0.5rem;
      }

      .menu, .reboot-container {
        display: none;
      }

      .menu.show, .reboot-container.show {
        display: flex;
        flex-direction: column;
      }
    }
  </style>
  <button class="menu-button">
    Menu
    <img src="assets/dropdown.svg" alt="Menu"></img>
  </button>
  <nav>
    <div class="menu">
      <!-- Menu items inserted via JS -->
    </div>
  </nav>
  <div class="reboot-container">
    <button class="reboot-button">
        <img src="assets/reboot.svg">Reboot Device
    </button>
  </div>
`;

export class AppNavbar extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(navbarTemplate.content.cloneNode(true));
    this.menu = shadowRoot.querySelector('.menu');
    this.currentOpen = null;

    // This button is for showing the menu via a menu button in mobile devices
    this.menuBtn = shadowRoot.querySelector('.menu-button');
    this.rebootContainer = shadowRoot.querySelector('.reboot-container');
    this.menuItems = shadowRoot.querySelector('.menu');

    this.menuBtn.addEventListener('click', () => {
      this.menuItems.classList.toggle('show');
      this.rebootContainer.classList.toggle('show');
    });

    // Adding Rebooot functionality to the button
    const rebootBtn = shadowRoot.querySelector('.reboot-button');
    rebootBtn.addEventListener('click', () => this.rebootDevice());

    // Populate navbar with items
    main.items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      menuItem.innerHTML = `<img src="assets/${item.icon}.svg"><span>${item.label}</span>`;

      if (item.submenu) {
        const arrow = document.createElement('span');
        arrow.textContent = '▼';
        arrow.classList.add('expand-icon');
        menuItem.appendChild(arrow);
        
        const subMenu = document.createElement('div');
        subMenu.classList.add('submenu');
        item.submenu.forEach(option => {
          const subMenuItem = document.createElement('div');
          subMenuItem.classList.add('submenu-item');
          subMenuItem.textContent = option.label;
          subMenuItem.addEventListener('click', event => {
            event.stopPropagation();
            window.location.href = option.link;
          });
          subMenu.appendChild(subMenuItem);
        });
        this.menu.appendChild(menuItem);
        this.menu.appendChild(subMenu);

        menuItem.addEventListener('click', () => {
          if (this.currentOpen === subMenu) {
            subMenu.style.display = 'none';
            menuItem.classList.remove('expanded');
            this.currentOpen = null;
          } else {
            if (this.currentOpen) {
              this.currentOpen.style.display = 'none';
              this.currentOpen.previousSibling.classList.remove('expanded');
            }
            subMenu.style.display = 'flex';
            menuItem.classList.add('expanded');
            this.currentOpen = subMenu;
          }
        });
      } else {
        this.menu.appendChild(menuItem);
        menuItem.addEventListener('click', () => {
          window.location.href = item.link;
        });
      }
    });
  }
  //Reboot Function
  rebootDevice() {
    console.log('Restarting device...');
    fetch("/reset.html", { method: "POST", headers: { "Content-Type": "text/html\r\n" } })
        .then((response => {
            // Check if response status indicates success
            if (response.ok) {
                console.log("Post request response");
                showToast('success', 'Device will restart now...Please reload');
                window.location.reload();
            } else if (response.redirected) {
                showToast('fail', 'You are logged out. Please login again!');
                window.location.href = response.url;
            } else {
                console.log('Response status:', response.status);
                showToast('fail', 'Error restarting device');
            }
        }))
        .catch((n) => {
            console.error("Error:", n);
        });
  }
}

customElements.define('app-navbar', AppNavbar);