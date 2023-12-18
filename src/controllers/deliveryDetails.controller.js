const { deliveryService } = require("../services");

const saveDeliveryDetails = async (req, res) => {
  const response = await deliveryService.addDeliveryDetails(req.body);
  res.status(response.status).json({ message: response.message });
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
  res.status(response.status).json({ response });
};

module.exports = { saveDeliveryDetails, updateDetails };
