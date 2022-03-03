export default class ServiceWS {
  constructor() {
    this.initConnection();
    this.controller = null;
  }

  bindController(controller) {
    this.controller = controller;
  }

  initConnection() {
    this.ws = new WebSocket('wss://ahjhw81server.herokuapp.com/');
    // Catch all incoming messages and pass them to handler function
    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      this.serverReplyHandler(data);
    });
    /*
    this.ws.addEventListener('open', () => {
      console.log('connected');
    });
    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });
    this.ws.addEventListener('error', () => {
      console.log('server error');
    });
    */
  }

  // Login user with
  userLogin(username) {
    const data = {
      header: 'user-login',
      text: null,
      username,
      date: null,
    };
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  sendNewMessage(text) {
    const data = {
      header: 'user-message',
      text,
      username: this.controller.username,
      date: null,
    };
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  serverReplyHandler(data) {
    if (data.header === 'username-busy') {
      this.controller.loginRefused();
      return;
    }
    if (data.header === 'update-data') {
      this.controller.loginSucceed(data);
      return;
    }
    if (data.header === 'new-user') {
      return;
    }
    if (data.header === 'new-message') {
      this.controller.newMessageReceived(data);
      return;
    }
    if (data.header === 'user-left') {
      this.controller.userLeft(data);
      return;
    }
    if (data.header === 'user-joined') {
      this.controller.userJoined(data);
    }
  }
}
