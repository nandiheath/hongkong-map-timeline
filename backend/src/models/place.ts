import { Document, Schema, Model, Point, model } from 'mongoose';
import * as PromiseBluebird from 'bluebird';
import { jsonTransform } from './../utils/model_helper';
import { Localizable, ILocalizable } from './localizable';
import { TagSchema, ITagDocument } from './tag';
import { PLACE_PROVIDER } from './../common/common';

const bcrypt = PromiseBluebird.promisifyAll(require('bcrypt'));

const PlaceSchema = new Schema(
  {
    name: Localizable({ index: true }),
    description: Localizable({}),
    address: Localizable({}),
    year_from: {
      type: Number,
      default: 0,
    },
    year_to: {
      type: Number,
      default: 2999,
    },
    // GeoJSON
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
    tags: [TagSchema],
    provider: {
      type: String,
      enum: PLACE_PROVIDER,
    },
    provider_id: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform: jsonTransform([], (ret) => {
        ret.location = {
          lat: ret.location.coordinates[1],
          lng: ret.location.coordinates[0],
        };
      }),
    },
  });

PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ provider: 1, provider_id: 1, year_from: 1, year_to: 1 }, { unique: true });

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
