import { render } from '../render.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view.js';

export default class Presenter {
  pointComponent = new PointListView();

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(new SortView(), this.container);
    render(this.pointComponent, this.container);

    render(new AddPointView(), this.pointComponent.getElement());
    render(new EditPointView({point: this.points[0]}), this.pointComponent.getElement());
    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}), this.pointComponent.getElement());
    }
  }
}
