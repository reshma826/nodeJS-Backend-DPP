const db = require("../model");
const { deliveryDetails } = db;
const httpStatus = require("http-status");
const logger = require("../config/logger");

const config = require("../config/config");
const ApiError = require("../utils/ApiError");

const addDeliveryDetails = async (payload) => {
  try {
    let responseToSend;
    payload.total_dvd_delivered = payload.dvd_details.length;
    payload.delivery_charges = config.DELIVERY_CHARGE_PER_DELIVERY;
    const dbResponse = await deliveryDetails.create(payload);
    responseToSend = {
      status: httpStatus.OK,
      message: "delivery details added Successfully",
      delivery_id: dbResponse.dataValues.id,
    };
    return responseToSend;
  } catch (err) {
    logger.error(err);
  }
};

const updateDeliveryDetails = async (payload, delivery_id) => {
  const t = await db.sequelize.transaction();
  let details = await deliveryDetails.findOne({
    where: { id: delivery_id },
  });
  if (!details) {
    return {
      status: httpStatus.NOT_FOUND,
      message: "USER_NOT_FOUND",
    };
  }
  try {
    Object.assign(details, payload);
    await details.save({ transaction: t });
    await t.commit();
    logger.info(" Details updated successfully");
    return {
      status: httpStatus.OK,
      message: "Details updated sucessfully",
    };
  } catch (err) {
    await t.rollback();
    logger.error(err);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

const updateDvdDeliveryDetails = async (payload, delivery_id) => {
  let details = await deliveryDetails.findOne({
    where: { id: delivery_id },
  });
  if (!details) {
    return {
      status: httpStatus.NOT_FOUND,
      message: "Details not found",
    };
  }
  let exsistingData = details.dataValues.dvd_details;
  exsistingData.push(payload.dvd_details[0]);
  payload.dvd_details = exsistingData;
  await deliveryDetails.update(
    {
      dvd_details: payload.dvd_details,
      total_dvd_delivered: payload.dvd_details.length,
    },
    {
      where: { id: delivery_id },
    }
  );
  logger.info("Details updated successfully");
  return {
    status: httpStatus.OK,
    message: "Details updated sucessfully",
  };
};

const getDeliveryDetailsByCustomerId = async (id) => {
  let details = await deliveryDetails.findOne({ where: { customer_id: id } });
  return details;
};
module.exports = {
  addDeliveryDetails,
  updateDeliveryDetails,
  updateDvdDeliveryDetails,
  getDeliveryDetailsByCustomerId,
};
