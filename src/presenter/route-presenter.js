import { render } from '../render.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class RoutePresenter {
  eventComponent = new EventListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    render(this.eventComponent, this.container);

    render(new EditPointView, this.eventComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView, this.eventComponent.getElement());
    }
  }
}
