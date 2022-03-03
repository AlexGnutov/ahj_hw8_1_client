import { create } from '../utils/utils';

export default class UserCard {
  constructor(username) {
    this.container = create('div', 'user-card');
    this.markup = `
    <div class="user-card-name">${username}</div>
    `;
    this.container.innerHTML = this.markup;
  }

  html() {
    return this.container;
  }
}
