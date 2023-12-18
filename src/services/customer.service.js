const db = require("../model");
const { customer } = db;
const httpStatus = require("http-status");
const logger = require("../config/logger");

const addCustomer = async (payload) => {
  let responseToSend;
  try {
    const dbResponse = await customer.create(payload);
    console.log("Customer added");
    responseToSend = {
      status: httpStatus.OK,
      message: "Customer added Successfully",
      customer_id: dbResponse.dataValues.id,
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

const getCustomerDetails = async (contactNumber) => {
  try {
    const details = await customer.findOne({
      where: { contact_number: contactNumber },
    });
    return details;
  } catch (err) {
    logger.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports = { addCustomer, getCustomerDetails };
