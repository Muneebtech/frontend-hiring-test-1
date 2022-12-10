const mongoose = require("mongoose");
const { paginate, toJSON } = require('./plugins');
const callSchema = mongoose.Schema(
  {
    direction: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    duration: {
      type: String,
    },
    is_archived: {
      type: Boolean,
    },
    call_type: {
      type: String,
    },
    via: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
callSchema.plugin(paginate);

/**
 * @typedef Call
 */

const Call = mongoose.model("Call", callSchema);

module.exports = Call;
