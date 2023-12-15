const { deliveryService } = require("../services");

const saveDeliveryDetails = async (req, res) => {
  const response = await deliveryService.addDeliveryDetails(req.body);
  res.send({ response });
};

const updateDetails = async (req, res) => {
  payload = req.body;
  let response;
  let id = req.params.id;
  if (payload.dvd_details) {
    response = await deliveryService.updateDvdDeliveryDetails(payload, id);
  } else {
    response = await deliveryService.updateDeliveryDetails(payload, id);
  }
  res.send(response);
};

module.exports = { saveDeliveryDetails, updateDetails };
