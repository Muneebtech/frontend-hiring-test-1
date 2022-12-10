const mongoose = require("mongoose");
const { paginate, toJSON } = require('./plugins');
const noteSchema = mongoose.Schema(
    {
      content: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  noteSchema.plugin(paginate);
/**
 * @typedef Note
 */
  const Note = mongoose.model("Note", noteSchema);
  
  module.exports = Note;
  