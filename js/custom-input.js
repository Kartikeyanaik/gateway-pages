// CustomInput Web Component
const tpl = document.createElement('template');
tpl.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      margin-bottom: 1.5rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.45rem;
    }

    .title {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #303B54;
    }

    .input-wrapper {
      width: 100%;
    }

    input[type="text"], input[type="password"], select {
      width: 100%;
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #caced1;
      border-radius: 6px;
      box-sizing: border-box;
      color: #242524;
      background: #ffffff;
    }

    input[type="text"]::placeholder, input[type="password"]::placeholder {
      color: #8C8D8B;
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      background: url('assets/dropdown.svg') no-repeat right center;
      background-size: 2rem 2rem;
      background-position: right 0rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      padding: 0.25rem 0.25rem 0.25rem 0rem;
      font-size: 0.875rem;
      color: #303B54;
    }

    .checkbox-label input[type="checkbox"] {
      cursor: pointer;
      height: 1rem;
      width: 1rem;
      margin-left: 0;
      margin-right: 0.5rem;
    }

    #password-field {
      padding-left: 2rem;
      padding-right: 2.5rem;
    }

    .show-password {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      height: 1.25rem;
    }

    .password-icon {
      position: absolute;
      left: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      height: 1.25rem;
    }

    input[type="file"] {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .file-container {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.25rem 0.4rem;
      border: 1px solid #caced1;
      border-radius: 6px;
      background: #fff;
      box-sizing: border-box;
    }

    .file-button {
      flex-grow: 0;
      background: #FF7A00;
      color: #ffffff;
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 0.8rem;
      cursor: pointer;
      border: none;
    }

    .filename {
      margin-left: 0.75rem;
      font-size: 0.95rem;
      color: #8C8D8B;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .filename.has-file {
      color: #303B54;
    }

    .description {
      display: block;
      font-size: 0.8rem;
      color: #6C778B;
    }

    @media (max-width: 360px) {
      .title {
        font-size: 0.9rem;
      }

      input, select {
        font-size: 0.85rem;
      }

      .description {
        font-size: 0.75rem;
      }
    }
  </style>
  <div class="container">
    <label class="title"></label>
    <div class="input-wrapper"></div>
    <span class="description"></span>
  </div>
`;
class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'}).appendChild(tpl.content.cloneNode(true));
  }
  connectedCallback() {
    const type = this.getAttribute('type') || 'text';
    const titleText = this.getAttribute('title') || '';
    const placeholderText = this.getAttribute('placeholder') || '';
    const descriptionText = this.getAttribute('description') || '';
    const inputValue = this.getAttribute('value') || '';
    const dropdownItems = this.hasAttribute('options') ? JSON.parse(this.getAttribute('options')) : [];
    const fileType = this.getAttribute('filetype') || '';

    const titleElement = this.shadowRoot.querySelector('.title');
    const descriptionElement = this.shadowRoot.querySelector('.description');
    const wrapper = this.shadowRoot.querySelector('.input-wrapper');

    titleElement.textContent = titleText;
    descriptionElement.textContent = descriptionText;

    if (type === 'dropdown') {
      const select = document.createElement('select');
      dropdownItems.forEach(item => {
        const option = document.createElement('option');
        option.textContent = item;
        select.appendChild(option);
      });
      wrapper.appendChild(select);
    } 
    else if (type === 'checkbox') {
      const label = document.createElement('label');
      label.className = 'checkbox-label';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = inputValue === "enable" ? true : false;
      const text = document.createTextNode(placeholderText);
      label.appendChild(input);
      label.appendChild(text);
      wrapper.appendChild(label);
    } 
    else if (type === 'password') {
      const passwordWrapper = document.createElement('div');
      passwordWrapper.style.position = 'relative';

      const lock = document.createElement('img');
      lock.src = 'assets/password.svg'; 
      lock.className = "password-icon"
      passwordWrapper.appendChild(lock);

      const input = document.createElement('input');
      input.id = 'password-field';
      input.type = 'password';
      input.placeholder = placeholderText;
      passwordWrapper.appendChild(input);

      const eye = document.createElement('img');
      eye.src = 'assets/hide.svg'; 
      eye.className = "show-password"
      passwordWrapper.appendChild(eye);

      let visible = false;
      eye.addEventListener('click', () => {
        visible = !visible;
        input.type = visible ? 'text' : 'password';
        eye.src = visible ? 'assets/show.svg' : 'assets/hide.svg';
      });

      wrapper.appendChild(passwordWrapper);
    }
    else if (type === 'file') {
      const container = document.createElement('label');
      container.className = 'file-container';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'file-button';
      btn.textContent = 'Upload File';
      container.appendChild(btn);

      const span = document.createElement('span');
      span.className = 'filename';
      span.textContent = placeholderText;
      container.appendChild(span);

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = fileType;

      input.addEventListener('change', () => {
        if (input.files && input.files.length > 0) {
          span.textContent = input.files[0].name;
          span.classList.add('has-file');
        } else {
          span.textContent = placeholderText;
          span.classList.remove('has-file');
        }
      });

      container.appendChild(input);
      wrapper.appendChild(container);
    }
    else {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = placeholderText;
      input.value = inputValue;
      wrapper.appendChild(input);
    }
  }
}
customElements.define('custom-input', CustomInput);