import { mockEvents } from '../mock/event.js';

export default class PointsModel {
  events = [...mockEvents];

  getPoints() {
    return this.events;
  }
}
