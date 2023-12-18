const db = require("../model");
const { pickUpDetails } = db;
const httpStatus = require("http-status");
const logger = require("../config/logger");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const customerSrvice = require("./customer.service");
const deliveryService = require("./delivery.service");

const addPickUpDetails = async (payload) => {
  try {
    let responseToSend;

    const customerDetails = await customerSrvice.getCustomerDetails(
      payload.customer_contact_number
    );
    let customerId = customerDetails.dataValues.id;
    const deliveryDetails =
      await deliveryService.getDeliveryDetailsByCustomerId(customerId);

    if (
      deliveryDetails.dataValues.delivery_status !== "Delivered" &&
      deliveryDetails.dataValues.total_dvd_delivered !== 0
    ) {
      return (responseToSend = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "No order available to pick UP",
      });
    }
    let total_picked = payload.dvd_details.length;
    let awaiting_pickUp =
      deliveryDetails.dataValues.total_dvd_delivered - total_picked;
    payload.total_picked = total_picked;
    payload.awaiting_pickUp = awaiting_pickUp;

    const dbResponse = await pickUpDetails.create(payload);
    console.log("pickUp details added Successfully");
    responseToSend = {
      status: httpStatus.OK,
      message: "pickUp details added Successfully",
      pickUp_id: dbResponse.dataValues.id,
    };
    return responseToSend;
  } catch (err) {
    logger.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

const updatePickUpDetails = async (payload, pickUp_id) => {
  const t = await db.sequelize.transaction();
  let details = await pickUpDetails.findOne({
    where: { id: pickUp_id },
  });
  if (!details) {
    return {
      status: httpStatus.NOT_FOUND,
      message: "PICKUP_NOT_FOUND",
    };
  }
  try {
    Object.assign(details, payload);
    await details.save({ transaction: t });
    await t.commit();
    console.log("pickUp details updated Successfully");
    logger.info(" Pick up Details updated successfully");
    return {
      status: httpStatus.OK,
      message: "Pick up Details updated sucessfully",
    };
  } catch (err) {
    await t.rollback();
    logger.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

const updateDvdPickUpDetails = async (payload, pickUp_id) => {
  let details = await pickUpDetails.findOne({
    where: { id: pickUp_id },
  });
  if (!details) {
    return {
      status: httpStatus.NOT_FOUND,
      message: "Details not found",
    };
  }

  const customerDetails = await customerSrvice.getCustomerDetails(
    details.dataValues.customer_contact_number
  );
  let customerId = customerDetails.dataValues.id;
  const deliveryDetails = await deliveryService.getDeliveryDetailsByCustomerId(
    customerId
  );
  let totalDvdDelivered = deliveryDetails.dataValues.total_dvd_delivered;
  let exsistingData = details.dataValues.dvd_details;
  exsistingData.push(payload.dvd_details[0]);
  payload.dvd_details = exsistingData;
  await pickUpDetails.update(
    {
      dvd_details: payload.dvd_details,
      total_picked: payload.dvd_details.length,
      awaiting_pickUp: totalDvdDelivered - payload.dvd_details.length,
    },
    {
      where: { id: pickUp_id },
    }
  );
  logger.info("Details updated successfully");
  return {
    status: httpStatus.OK,
    message: "Details updated sucessfully",
  };
};

module.exports = {
  addPickUpDetails,
  updatePickUpDetails,
  updateDvdPickUpDetails,
};
