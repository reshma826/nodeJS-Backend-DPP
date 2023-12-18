const db = require("../model");
const { user } = db;
const httpStatus = require("http-status");
const logger = require("../config/logger");

const createUser = async (payload) => {
  let responseToSend;
  try {
    const dbResponse = await user.create(payload);
    responseToSend = {
      status: httpStatus.OK,
      message: "User loged in Successfully",
      user_id: dbResponse.dataValues.id,
    };
  } catch (err) {
    logger.error(err.errors[0].message);
    responseToSend = {
      status: httpStatus.NOT_FOUND,
      message: err.errors[0].message,
    };
  }
  return responseToSend;
};

const getUserByEmail = async (email) => {
  let userDetails = await user.findOne({ where: { email: email } });
  if (userDetails) return userDetails;
  else return false;
};

module.exports = { createUser, getUserByEmail };
