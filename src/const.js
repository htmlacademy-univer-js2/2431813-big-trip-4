const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const DESTINATIONS = [
  'Chamonix',
  'Amsterdam',
  'Moscow',
  'Sydney',
  'Washington'
];

const DATES = [
  {
    start: new Date(Date.UTC(2024, 8, 28, 8, 15, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 28, 10, 15, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 8, 21, 18, 30, 10, 0)),
    end: new Date(Date.UTC(2024, 8, 21, 20, 30, 10, 0))
  },
  {
    start: new Date(Date.UTC(2024, 8, 25, 12, 0, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 25, 14, 0, 0, 0))
  },
];

const BLANC_TEST =
{
  type: null,
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: {
    id: 0
  },
  desctiption:'',
  photosSrc: []
};

const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
const DATE_FORMAT_POINT_DAY = 'MMM DD';
const DATE_FORMAT_POINT_HOURS = 'hh-mm';

const PHOTOS_COUNT = 20;
const MAX_PRICE = 2000;
const MAX_OFFER_ID = 5;
const POINTS_COUNT = 4;

const SortTypes = {
  DEFAULT: 'default',
  BY_PRICE: 'price',
  BY_TIME: 'time',
  BY_OFFERS: 'offers',
  BY_NAME: 'name',
};

const PresenterModes = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export {PresenterModes, MAX_PRICE,
  MAX_OFFER_ID,PHOTOS_COUNT,
  DESTINATIONS, TYPES,
  DATE_FORMAT_EDIT, DATE_FORMAT_POINT_DAY,
  DATE_FORMAT_POINT_HOURS, BLANC_TEST,
  POINTS_COUNT, DATES,
  SortTypes};
