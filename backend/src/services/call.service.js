const httpStatus = require("http-status");
const  Call  = require("../models/call.model");
const ApiError = require("../utils/ApiError");
/**
 * Create a call
 * @param {Object} userBody
 * @returns {Promise<Call>}
 */
const createCall = async (userBody) => {
  const call = await Call.create(userBody);
  return call;
};

/**
 * Query for calls
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCalls = async (options) => {
  const calls = await Call.paginate(options);
  return calls;
};

/**
 * @param {ObjectId} id
 * @returns {Promise<Call>}
 */


const getCallById = async (id) => {
  return Call.findById(id);
};

/**
 * Get call by type
 * @param {string} type
 * @returns {Promise<Call>}
 */
const getCallByType = async (type) => {
  return Call.findOne({ type });
};

module.exports = {
  createCall,
  queryCalls,
  getCallById,
  getCallByType,
};
