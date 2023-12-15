const { customerService } = require("../services");

const saveCustomerDetails = async (req, res) => {
  const response = await customerService.addCustomer(req.body);
  res.send({ response });
};

module.exports = { saveCustomerDetails };
