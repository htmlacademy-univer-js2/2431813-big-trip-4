import { getRandomArrayElement, getRandomInteger } from '../utils/main-utils.js';
import { TYPES } from '../const.js';
import dayjs from 'dayjs';

const BasePrice = {
  MIN: 400,
  MAX: 1200
};

const eventData = [
  {
    type: getRandomArrayElement(TYPES),
    price: getRandomInteger(BasePrice.MIN, BasePrice.MAX),
    dateFrom: dayjs('2024-11-1 12:00'),
    dateTo: dayjs('2024-11-2 14:00'),
    destination: 1,
    offers: [1],
    isFavorite: Boolean(getRandomInteger(0, 1))
  },
  {
    type: getRandomArrayElement(TYPES),
    price: getRandomInteger(BasePrice.MIN, BasePrice.MAX),
    dateFrom: dayjs('2024-04-9 13:00'),
    dateTo: dayjs('2024-04-9 13:30'),
    destination: 2,
    offers: [1],
    isFavorite: Boolean(getRandomInteger(0, 1))
  },
  {
    type: getRandomArrayElement(TYPES),
    price: getRandomInteger(BasePrice.MIN, BasePrice.MAX),
    dateFrom: dayjs('2024-03-14 14:30'),
    dateTo: dayjs('2024-03-14 15:45'),
    destination: 3,
    offers: [1],
    isFavorite: Boolean(getRandomInteger(0, 1))
  }
];

const mockEvents = eventData.map((event, index) => ({ id: index + 1, ...event }));

export { mockEvents };
