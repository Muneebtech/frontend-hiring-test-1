const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { callService } = require('../services');

const createCall = catchAsync(async (req, res) => {
  let createBody = req.body;
  const call = await callService.createCall(createBody);
  res.status(httpStatus.CREATED).send(call);
});

const getCalls = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['firstName', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await callService.queryCalls(filter, options);
  res.send(result);
});

const getCall = catchAsync(async (req, res) => {
  const user = await callService.getCallById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});




module.exports = {
  createCall,
  getCalls,
  getCall,
};
