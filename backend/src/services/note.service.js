const httpStatus = require("http-status");
const  Note  = require("../models/note.model");
const ApiError = require("../utils/ApiError");
/**
 * Create a note
 * @param {Object} noteBody
 * @returns {Promise<Note>}
 */
const createNote = async (noteBody) => {
  const note = await Note.create(noteBody);
  return note;
};

/**
 * Query for notes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNotes = async (filter, options) => {
  const notes = await Note.paginate(filter, options);
  return notes;
};

/**
 * @param {ObjectId} id
 * @returns {Promise<Note>}
 */


const getNoteById = async (id) => {
  return Note.findById(id);
};


module.exports = {
  createNote,
  queryNotes,
  getNoteById
};
