import { mockEvents } from '../mock/event.js';

export default class PointsModel {
  #events = [...mockEvents];

  get points() {
    return this.#events;
  }
}
