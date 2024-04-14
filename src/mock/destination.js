import { getRandomArrayElement } from '../utils.js';
import { DESTINATIONS, FILLER_TEXT, RANDOM_PICTURE } from '../const.js';


const generatePicture = () => ({
  src: getRandomArrayElement(RANDOM_PICTURE),
  description: ''
});

const generateDestination = (id) => ({
  id,
  description: getRandomArrayElement(FILLER_TEXT),
  name: getRandomArrayElement(DESTINATIONS),
  pictures: id === 3 ? [] : [generatePicture(), ...(id === 2 ? [generatePicture()] : [generatePicture(), generatePicture()])]
});

const mockDestinations = [
  generateDestination(1),
  generateDestination(2),
  generateDestination(3)
];

export { mockDestinations };
