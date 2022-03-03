import { create } from '../utils/utils';

export default class LoginForm {
  constructor(parent) {
    this.container = create('div', 'ch-form-container');
    this.markup = `
      <form id="ch-form" class="ch-form">
        <h3>Enter username</h3>
        <input class="ch-input" name="username">
        <div class="ch-server-message"></div>
        <button class="ch-form-button">Continue</button>
      </form>
    `;
    this.container.innerHTML = this.markup;
    parent.appendChild(this.container);
  }

  showMessage(message) {
    if (message) {
      this.container.querySelector('.ch-server-message').textContent = message;
      setTimeout(() => {
        this.container.querySelector('.ch-server-message').textContent = '';
      }, 2000);
    }
  }

  hideForm() {
    this.container.querySelector('.ch-server-message').textContent = '';
    this.container.classList.add('hidden');
  }

  returnValues() {
    const input = this.container.querySelector('.ch-input');
    return input.value;
  }
}
