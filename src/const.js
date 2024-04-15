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

const FILLER_TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
];

const DESTINATIONS = [
  'Chamonix',
  'Amsterdam',
  'Moscow',
  'Sydney',
  'Washington'
];

const RANDOM_PICTURE = [
  'https://loremflickr.com/248/152?random=1337',
  'https://loremflickr.com/248/152?random=322',
  'https://loremflickr.com/248/152?random=123'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DATE_FORMAT_HOURS = 'hh:mm';
const DATE_FORMAT_DAY = 'MM DD';
const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';

export { TYPES, DESTINATIONS,
  FILLER_TEXT, RANDOM_PICTURE,
  FilterType, DATE_FORMAT_HOURS,
  DATE_FORMAT_DAY, DATE_FORMAT_EDIT
};
