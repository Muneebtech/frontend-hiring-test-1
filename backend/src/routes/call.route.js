const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const callValidation = require('../validations/call.validation');
const callController = require('../controllers/call.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(callValidation.createCall) ,callController.createCall)
  .get(validate(callValidation.getCalls), callController.getCalls);

router 
  .route('/:callId')
  .get( validate(callValidation.getCall), callController.getCall)
module.exports = router;
