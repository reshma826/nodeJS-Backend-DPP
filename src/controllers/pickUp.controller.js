const { pickUpService } = require("../services");

const savePickUpDetails = async (req, res) => {
  const response = await pickUpService.addPickUpDetails(req.body);
  res.send({ response });
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
  res.send(response);
};

module.exports = { savePickUpDetails, updateDetails };
