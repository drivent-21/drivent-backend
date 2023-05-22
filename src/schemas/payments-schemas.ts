import Joi from 'joi';

export const paymentSchema = Joi.object({
  value: Joi.string().required(),
  cardIssuer: Joi.string().required(),
});
