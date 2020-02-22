import Joi from '@hapi/joi';

export const localSchema = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  return next(error);
};