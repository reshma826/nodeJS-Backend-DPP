module.exports = (sequelize, Sequelize) => {
  const userDetails = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    full_name: {
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
  });
  return userDetails;
};
