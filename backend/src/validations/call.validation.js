const Joi = require('joi');
const {  objectId } = require('./custom.validation');
const createCall = {
  body: Joi.object().keys({
    direction: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    duration: Joi.string(),
    is_archived: Joi.boolean(),
    call_type: Joi.string(),
    via: Joi.string(),
    notes: Joi.string()
  }),
};

const getCalls = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCall = {
  params: Joi.object().keys({
    callId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createCall,
  getCalls,
  getCall,
};
