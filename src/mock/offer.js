import { getRandomInteger } from '../utils.js';

const OfferPrice = {
  MIN: 20,
  MAX: 100
};

const generateOffer = () => ({
  id: 1,
  title: 'Offer',
  price: getRandomInteger(OfferPrice.MIN, OfferPrice.MAX)
});

const mockOffers = [
  { type: 'Taxi', offers: [generateOffer('Taxi')] },
  { type: 'Bus', offers: [generateOffer('Bus')] },
  { type: 'Train', offers: [generateOffer('Train')] },
  { type: 'Ship', offers: [generateOffer('Ship')] },
  { type: 'Drive', offers: [generateOffer('Drive')] },
  { type: 'Flight', offers: [generateOffer('Flight')] },
  { type: 'Check-in', offers: [generateOffer('Check-in')] },
  { type: 'Sightseeing', offers: [generateOffer('Sightseeing')] },
  { type: 'Restaurant', offers: [generateOffer('Restaurant')] }
];


export { mockOffers };
