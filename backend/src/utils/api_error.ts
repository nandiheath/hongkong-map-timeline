import * as RestifyErrors from 'restify-errors';

const ERROR_INTERNAL = 500;
// 1xxxx: auth related
const ERROR_USER_NOT_FOUND = 10000;

// 2xxxx: db/server related
const ERROR_ENTITY_NOT_FOUND = 20000;
export const ERROR_SERVER_EXCEPTION = 20001;
const ERROR_ENTITY_ALREADY_EXISTS = 20002;
const ERROR_ENTITY_DUPLICATED = 20003;

export const EntityNotFound = () => new RestifyErrors.BadRequestError({ code: ERROR_ENTITY_NOT_FOUND }, 'entity not found');

export const UnauthoirzedRequest = () => new RestifyErrors.UnauthorizedError({ code: ERROR_USER_NOT_FOUND }, 'user not found');

export const DBConnectionFailed = () => new RestifyErrors.InternalServerError({ code: ERROR_SERVER_EXCEPTION }, 'server exception');

export const EntityAlreadyExists = () => new RestifyErrors.InternalServerError({ code: ERROR_ENTITY_ALREADY_EXISTS }, 'entity already exists');

export const DuplicatedEntry = () => new RestifyErrors.BadRequestError({ code: ERROR_ENTITY_DUPLICATED }, 'entity already exists');

export const InternalError = err => new RestifyErrors.InternalServerError({ code: ERROR_INTERNAL }, err.message);

export const BadRequestError = message => new RestifyErrors.BadRequestError({ code: ERROR_INTERNAL }, message);
