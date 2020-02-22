import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';

export function errorHandler(err, req, res, next) { // eslint-disable-line
  if (err.isJoi) {
    return res.status(BAD_REQUEST).send(err.details);
  }

  if (err.name === 'MulterError') {
    return res.status(BAD_REQUEST).send({ err: err.toString() });
  }

  return res.status(err.status || INTERNAL_SERVER_ERROR).send({ err: err.toString() });
}