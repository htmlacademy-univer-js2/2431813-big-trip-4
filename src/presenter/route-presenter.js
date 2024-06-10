import {
  RenderPosition,
  remove,
  render,
} from '../framework/render.js';
import EventsListEmptyView from '../view/events-list-empty-view.js';
import { SORTING_COLUMNS, SortType, UiBlockerLimit, UpdateType, UserAction, FilterType } from '../const.js';
import PointPresenter from './point-presenter.js';
import { filterByType, sortByType } from '../utils.js';
import SortingView from '../view/sorting-view.js';
import LoaderView from '../view/loader-view.js';
import ErrorView from '../view/error-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class RoutePresenter {
  #container = null;
  #loaderComponent = new LoaderView();
  #errorComponent = new ErrorView();
  #emptyListComponent = null;
  #listComponent = null;
  #sortingComponent = null;

  #createPointPresenter = null;
  #pointsPresenters = new Map();

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.ANY;

  #uiBlocker = new UiBlocker({
    lowerLimit: UiBlockerLimit.LOWER,
    upperLimit: UiBlockerLimit.UPPER,
  });

  #isLoading = true;
  #isError = false;

  constructor({
    container,
    pointsContainer,
    createPointPresenter,
    pointsModel,
    offersModel,
    destinationsModel,
    filtersModel,
  }) {
    this.#container = container;
    this.#listComponent = pointsContainer;
    this.#createPointPresenter = createPointPresenter;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#pointsModelEventHandler);
    this.#filtersModel.addObserver(this.#filterModelEventHandler);
  }

  get points() {
    this.#filterType = this.#filtersModel.get();
    const points = this.#pointsModel.get();
    const filteredPoints = filterByType[this.#filterType](points);

    return sortByType[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#createPointPresenter.init(this.#userActionHandler);
    this.#renderRoute();
  }

  destroy() {
    remove(this.#sortingComponent);
    this.#clearRoute();
  }

  #renderLoader() {
    render(this.#loaderComponent, this.#container);
  }

  #renderError() {
    render(this.#errorComponent, this.#container);
  }

  #renderStub() {
    this.#emptyListComponent = new EventsListEmptyView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#container);
  }

  #renderSort() {
    this.#sortingComponent = new SortingView({
      items: SORTING_COLUMNS,
      selectedSortType: this.#currentSortType,
      onSortChange: this.#sortChangeHandler,
    });

    render(this.#sortingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderRoute() {
    if (this.#isError) {
      this.#createPointPresenter.setButtonDisabled(true);
      this.#renderError();
      return;
    }

    if (this.#isLoading) {
      this.#createPointPresenter.setButtonDisabled(true);
      this.#renderLoader();
      return;
    }

    this.#createPointPresenter.setButtonDisabled(false);
    if (!this.points.length) {
      this.#renderStub();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearRoute() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
    remove(this.#emptyListComponent);
    remove(this.#sortingComponent);
    remove(this.#loaderComponent);
    remove(this.#errorComponent);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#listComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onUserAction: this.#userActionHandler,
      onEditorOpen: this.#pointEditHandler,
    });

    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #userActionHandler = async (actionType, data) => {
    this.#uiBlocker.block();
    let presenter;
    try {
      switch (actionType) {
        case UserAction.CREATE_POINT:
          presenter = this.#createPointPresenter;
          await this.#createPointHandler(data);
          break;

        case UserAction.UPDATE_POINT:
          presenter = this.#pointsPresenters.get(data.id);
          await this.#updatePointHandler(data);
          break;

        case UserAction.DELETE_POINT:
          presenter = this.#pointsPresenters.get(data.id);
          await this.#deletePointHandler(data);
          break;
        default:
          throw new Error(`RoutePresenter - unknown user action: ${actionType}`);
      }
      presenter.resetView();
    } catch (err) {
      presenter.triggerError();
      this.#isError = true;
    }

    this.#uiBlocker.unblock();
  };

  async #createPointHandler(data) {
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.set(UpdateType.MAJOR, FilterType.ANY);
    await this.#pointsModel.create(UpdateType.MAJOR, data);
  }

  #updatePointHandler = (data) =>
    this.#pointsModel.update(UpdateType.MINOR, data);

  #deletePointHandler = (data) =>
    this.#pointsModel.delete(UpdateType.MAJOR, data);

  #pointEditHandler = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortChangeHandler = (sortType) => {
    this.#currentSortType = sortType;

    this.#clearRoute();
    this.#renderRoute();
  };

  #pointsModelEventHandler = (type, data) => {
    if (this.#isError || data?.error) {
      this.#isError = true;
      this.#clearRoute();
      this.#renderRoute();
      return;
    }

    switch (type) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loaderComponent);
        this.#clearRoute();
        this.#renderRoute();
        break;

      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id)?.init(data);
        break;

      case UpdateType.MINOR:
      case UpdateType.MAJOR:
      default:
        this.#clearRoute();
        this.#renderRoute();
        break;
    }
  };

  #filterModelEventHandler = (type) => {
    switch (type) {
      case UpdateType.INIT:
      case UpdateType.PATCH:
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
      default:
        this.#clearRoute();
        this.#renderRoute();
        break;
    }
  };
}
