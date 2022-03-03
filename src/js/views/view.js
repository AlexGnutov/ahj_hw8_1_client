import { create } from '../utils/utils';
import UserCard from './user-card';
import LoginForm from './login-form';
import MessageCard from './message-card';

export default class View {
  constructor(parent) {
    this.currentUser = '';
    this.container = create('div', 'chat-container');
    this.markup = `
    <div class="ch-users"></div>
    <div class="ch-messages">
        <div class="ch-messages-list"></div>
        <form class="ch-send-message-form">
            <input class="ch-message-input" name="text">
            <button class="hidden"></button>
        </form>
    </div>
    `;
    this.container.innerHTML = this.markup;
    parent.appendChild(this.container);
    this.form = new LoginForm(this.container);
  }

  addUsers(usersArray) {
    usersArray.forEach((username) => {
      const name = username === this.currentUser ? 'You' : username;
      const userCard = new UserCard(name);
      this.container.querySelector('.ch-users').appendChild(userCard.html());
    });
  }

  removeUser(username) {
    const userCards = Array.from(this.container.querySelectorAll('.user-card'));
    const elem = userCards.find((card) => card.querySelector('.user-card-name').innerText === username);
    if (elem) {
      elem.remove();
    }
  }

  addMessages(messages) {
    messages.forEach((message) => {
      let messageData;
      if (message.username === this.currentUser) {
        messageData = {
          ...message,
          username: 'You',
        };
      } else {
        messageData = message;
      }
      const messageCard = new MessageCard(messageData);
      if (message.username === this.currentUser) {
        messageCard.html().classList.add('ch-message-own');
      } else {
        messageCard.html().classList.add('ch-message-not-own');
      }
      this.container.querySelector('.ch-messages-list').appendChild(messageCard.html());
    });
    this.scrollMessagesDown();
  }

  clearMessageInput() {
    this.container.querySelector('.ch-message-input').value = '';
  }

  scrollMessagesDown() {
    const elem = this.container.querySelector('.ch-messages-list');
    elem.scrollTop = elem.scrollHeight - elem.offsetHeight;
  }
}
