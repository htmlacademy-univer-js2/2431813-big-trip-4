import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { RenderPosition, render } from './render.js';
import Presenter from './presenter/route-presenter.js';
import PointsModel from './model/point-model.js';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const presenter = new Presenter({
  container: siteEventElement,
  pointsModel,
});

render(new TripInfoView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement);

presenter.init();
