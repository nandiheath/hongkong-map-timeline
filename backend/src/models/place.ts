import { Document, Schema, Model, Point, model } from 'mongoose';
import * as PromiseBluebird from 'bluebird';
import { jsonTransform } from './../utils/model_helper';
import { Localizable, ILocalizable } from './localizable';
import { TagSchema, ITagDocument } from './tag';

const bcrypt = PromiseBluebird.promisifyAll(require('bcrypt'));

const PlaceSchema = new Schema(
  {
    name: Localizable({ index: true }),
    description: Localizable({}),
    address: Localizable({}),
    // GeoJSON
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
    tags: [TagSchema],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform: jsonTransform([]),
    },
  });

PlaceSchema.index({ location: '2dsphere' });

/**
* Public interface for place model
*/
export interface IPlace {
  name?: ILocalizable;
  description?: ILocalizable;
  tags: [ITagDocument];
}

export interface IPlaceDocument extends IPlace, Document {
}

export const Place: Model<IPlaceDocument> = model<IPlaceDocument>('Place', PlaceSchema);
