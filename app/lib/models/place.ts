import Localizable from './localizable';

export default interface IPlace {
  id: String,
  name: Localizable;
  description?: Localizable;
  tags?: Localizable[];
  address?: Localizable;
  location: {
    lat: Number,
    lng: Number,
  },
  year_from: Number;
  year_to: Number;
}