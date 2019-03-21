import * as passport from 'passport';
import { asyncMiddleware } from './async_middleware';
import { validate } from './controllers/validator';

import {
  passportAuthenicate,
} from './utils/api_helper';

// controllers
import * as authController from './controllers/auth_controller';

export const route = (server) => {
  // auth
  server.post('/auth/local', asyncMiddleware(authController.login));
  server.post('/auth/register', validate('/auth/register'), asyncMiddleware(authController.register));
  server.get('/me', passport.authenticate('jwt'), asyncMiddleware(authController.me));
  server.post('/auth/facebook', passportAuthenicate('facebook'), asyncMiddleware(authController.facebookLogin));

};
