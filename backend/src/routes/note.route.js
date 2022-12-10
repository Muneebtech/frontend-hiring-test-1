const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const noteValidation = require('../validations/note.validation');
const noteController = require('../controllers/note.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(noteValidation.createNote) ,noteController.createNote)
  .get(validate(noteValidation.getNotes), noteController.getNotes);

router 
  .route('/:noteId')
  .get( validate(noteValidation.getNote), noteController.getNote)
module.exports = router;
