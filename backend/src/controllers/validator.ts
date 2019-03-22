import { BadRequestError } from './../utils/api_error';
import * as Joi from 'joi';
import * as restify from 'restify';

import { PLACE_PROVIDER } from './../common/common';

export function validate(key) {
  return (req: restify.Request, res: restify.Response, next: restify.next) => {
    const {
      path,
      method,
    } = req.getRoute();

    const key = `${method} ${path}`;
    const validator = validators[key];
    if (validator) {
      const { error } = Joi.validate(req.body, validator);
      if (error) {
        return next(BadRequestError(error.message));
      }
    }
    next();
  };
}

const localizable = Joi.object().keys({
  en_us: Joi.string(),
  zh_hk: Joi.string(),
}).xor('en_us', 'zh_hk');

const location = Joi.object().keys({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
}).required();

const validators = {
  'POST /auth/register': Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  }).required(),
  'POST /place': Joi.object().keys({
    location,
    name: localizable.required(),
    description: localizable.optional(),
    address: localizable.optional(),
    year_from: Joi.number().optional(),
    year_to: Joi.number().optional(),
    provider: Joi.string().valid(PLACE_PROVIDER).required(),
    provider_id: Joi.string().required(),
  }).required(),
};
