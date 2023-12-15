const db = require("../model");
const { customer } = db;
const httpStatus = require("http-status");
const logger = require("../config/logger");

const addCustomer = async (payload) => {
  try {
    let responseToSend;
    const dbResponse = await customer.create(payload);
    responseToSend = {
      status: httpStatus.OK,
      message: "Customer added Successfully",
      customer_id: dbResponse.dataValues.id,
    };
    return responseToSend;
  } catch (err) {
    logger.error(err);
  }
};

const getCustomerDetails = async (contactNumber) => {
  try {
    const details = await customer.findOne({
      where: { contact_number: contactNumber },
    });
    return details;
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { addCustomer, getCustomerDetails };
