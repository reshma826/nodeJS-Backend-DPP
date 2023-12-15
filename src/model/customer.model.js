module.exports = (sequelize, Sequelize) => {
  const customerDetails = sequelize.define("customer_details", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    contact_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return customerDetails;
};
