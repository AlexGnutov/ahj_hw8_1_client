import View from './views/view';
import Controller from './controller/controller';
import ServiceWS from './service/service';

export default class Chat {
  constructor(parent) {
    this.view = new View(parent);
    this.service = new ServiceWS('');
    this.controller = new Controller(this.view, this.service);
  }
}
