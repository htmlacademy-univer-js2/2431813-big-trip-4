import dayjs from 'dayjs';

const getRandomInteger = (start, end) => Math.floor(Math.random() * (end - start + 1) + start);

const getRandomArrayElement = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Invalid input: items must be a non-empty array.');
  }
  return items[getRandomInteger(0, items.length - 1)];
};
const humanizeDueDate = (date, dateFormat) => dayjs(date).format(dateFormat);

const getDateDifference = (dateFrom, dateTo) => {
  const fromDate = dayjs(dateFrom);
  const toDate = dayjs(dateTo);

  if (toDate.isBefore(fromDate)) {
    throw new Error('Invalid input: dateTo must be after dateFrom.');
  }

  const days = toDate.diff(fromDate, 'd');
  const hours = toDate.diff(fromDate, 'h') % 24;
  const minutes = toDate.diff(fromDate, 'm') % 60;

  let difference = '';
  if (days !== 0) {difference += `${days}D `;}
  if (hours !== 0 || days !== 0) {difference += `${hours}H `;}
  difference += `${minutes}M`;

  return difference.trim();
};

export { getRandomInteger, getRandomArrayElement, humanizeDueDate, getDateDifference };
