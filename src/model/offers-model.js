import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #service = null;
  #offers = null;

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try {
      const offers = await this.#service.offers;
      this.#offers = offers;
      this._notify(UpdateType.INIT, { data: offers });

    } catch (err) {
      this.#offers = [];
      this._notify(UpdateType.INIT, { error: err });
    }
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offers) => offers.type === type.toLowerCase()).offers;
  }
}
