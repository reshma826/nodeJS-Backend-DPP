const { customerService } = require("../services");

const saveCustomerDetails = async (req, res) => {
  const response = await customerService.addCustomer(req.body);
  res.status(response.status).json({ response });
};

module.exports = { saveCustomerDetails };
