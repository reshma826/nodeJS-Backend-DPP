const { pickUpService } = require("../services");

const savePickUpDetails = async (req, res) => {
  const response = await pickUpService.addPickUpDetails(req.body);
  res.status(response.status).json({ response });
};

const updateDetails = async (req, res) => {
  payload = req.body;
  let response;
  let id = req.params.id;
  if (payload.dvd_details) {
    response = await pickUpService.updateDvdPickUpDetails(payload, id);
  } else {
    response = await pickUpService.updatePickUpDetails(payload, id);
  }
  res.status(response.status).json({ response });
};

module.exports = { savePickUpDetails, updateDetails };
