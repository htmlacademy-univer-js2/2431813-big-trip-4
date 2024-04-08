import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { RenderPosition, render } from './render.js';
import RoutePresenter from './presenter/route-presenter.js';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventElement = document.querySelector('.trip-events');

const boardPresenter = new RoutePresenter({ container: siteEventElement });

render(new TripInfoView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement);

boardPresenter.init();
