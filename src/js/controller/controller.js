export default class Controller {
  constructor(view, service) {
    this.view = view;
    this.loginform = this.view.form;
    this.service = service;
    this.service.bindController(this);
    this.username = '';
    this.init();
  }

  init() {
    this.view.container.addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('ch-form')) {
        this.loginFormSubmitted();
      }
      if (e.target.classList.contains('ch-send-message-form')) {
        this.messageSend(e);
      }
    });
  }

  loginSucceed(data) {
    this.loginform.hideForm();
    const { users, messages, username } = data;
    if (username) {
      this.username = username;
      this.view.currentUser = username;
    }
    if (users) {
      this.view.addUsers(users);
    }
    if (messages) {
      this.view.addMessages(messages);
    }
  }

  loginRefused() {
    this.loginform.showMessage('Username is busy');
  }

  loginFormSubmitted() {
    const username = this.loginform.returnValues();
    this.service.userLogin(username);
  }

  messageSend(e) {
    const text = e.target.elements.text.value;
    this.service.sendNewMessage(text);
    this.view.clearMessageInput();
  }

  newMessageReceived(data) {
    this.view.addMessages([data]);
  }

  userLeft(data) {
    this.view.removeUser(data.username);
  }

  userJoined(data) {
    this.view.addUsers([data.username]);
  }
}
