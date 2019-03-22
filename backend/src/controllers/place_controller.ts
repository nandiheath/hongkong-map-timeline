import { Place, IPlaceDocument } from './../models/place';
import * as restify from 'restify';
import { formatResponse, getUserFromReq } from '../utils/api_helper';

export async function list(req: restify.Request, res: restify.Response, next: restify.Next): Promise<void> {
  const query:any = {};
  const payload:any = req.body;
  if (payload.name) {
    query.mobile = req.body.mobile;
  } else if (payload.username) {
    query.username = req.body.username;
  }
  const places: IPlaceDocument[] = await Place.find(query);

  // TODO: pagination

  res.send(formatResponse({
    places,
  }));
  return next();
}

export async function create(req: restify.Request, res: restify.Response, next: restify.Next): Promise<void> {
  const { name, description, location, address, provider, provider_id, year_from, year_to } = req.body;

  const place = new Place({
    name,
    provider,
    provider_id,
    location: {
      type: 'Point',
      // Note that longitude comes first in a GeoJSON coordinate array, not latitude.
      coordinates: [location.lng, location.lat],
    },
  });

  if (address) {
    place.address = address;
  }
  if (description) {
    place.description = description;
  }
  if (year_from) {
    place.year_from = year_from;
  }
  if (year_to) {
    place.year_to = year_to;
  }

  // Let the async middleware handle the error
  await place.save();
  res.send(formatResponse({
    place,
  }));
  return next();
}

export async function update(req: Request, res: Response, next: Function): Promise<void> {

}