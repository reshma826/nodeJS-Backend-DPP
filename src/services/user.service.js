const db = require("../model");
const { user } = db;
const httpStatus = require("http-status");
const logger = require("../config/logger");

const createUser = async (payload) => {
  try {
    let responseToSend;
    const dbResponse = await user.create(payload);
    responseToSend = {
      status: httpStatus.OK,
      message: "User loged in Successfully",
      user_id: dbResponse.dataValues.id,
    };
    return responseToSend;
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { createUser };
