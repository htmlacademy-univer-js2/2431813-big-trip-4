import { replace, render } from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view.js';
import NoPointView from '../view/no-point-view.js';

export default class Presenter {
  #pointComponent = new PointListView();
  #container = null;
  #pointsModel = null;
  #points = null;

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new SortView(), this.#container);
    render(this.#pointComponent, this.#container);
    render(new AddPointView(), this.#pointComponent.element);

    if (this.#points.length === 0) {
      render(new NoPointView(), this.#container);
      return;
    }

    this.#points.forEach((point) => {
      const pointComponent = new PointView({
        point,
        onEditClick: () => {
          replacePointToEdit();
          document.addEventListener('keydown', onDocumentKeyDown);
        }
      });
      const editPointComponent = new EditPointView({
        point,
        onClick: () => {
          replaceEditToPoint();
          document.removeEventListener('keydown', onDocumentKeyDown);
        }
      });

      function onDocumentKeyDown(evt) {
        if (evt.key === 'Escape') {
          evt.prpointDefault();
          replaceEditToPoint();
          document.removeEventListener('keydown', onDocumentKeyDown);
        }
      }

      function replacePointToEdit() {
        replace(editPointComponent, pointComponent);
      }

      function replaceEditToPoint() {
        replace(pointComponent, editPointComponent);
      }

      render(pointComponent, this.#pointComponent.element);
    });
  }
}
