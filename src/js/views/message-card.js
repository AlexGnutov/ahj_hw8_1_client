import { create } from '../utils/utils';

export default class MessageCard {
  constructor(message) {
    this.container = create('div', 'ch-message-container');
    this.markup = `
      <div class="ch-message-header"></div>
      <div class="ch-message-text"></div>
    `;
    this.container.innerHTML = this.markup;
    this.container.querySelector('.ch-message-header').textContent = `${message.username}, ${message.date}`;
    this.container.querySelector('.ch-message-text').textContent = `${message.text}`;
  }

  html() {
    return this.container;
  }
}
