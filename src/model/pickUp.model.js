module.exports = (sequelize, Sequelize) => {
  const pickUpDetails = sequelize.define("pickUp_details", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    customer_contact_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    dvd_details: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
    total_picked: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    pick_up_status: {
      type: Sequelize.STRING,
      values: ["Pick up scheduled", "PickedUp", "successfully returned"],
      allowNull: true,
    },
    awaiting_pickUp: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return pickUpDetails;
};
