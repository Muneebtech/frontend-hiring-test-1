const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNote = {
  body: Joi.object().keys({
    content: Joi.string()
  }),
};

const getNotes = {
  query: Joi.object().keys({
    content: Joi.string(),
  }),
};

const getNote = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createNote,
  getNotes,
  getNote,
};
