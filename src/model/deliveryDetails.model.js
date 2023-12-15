module.exports = (sequelize, Sequelize) => {
  const deliveryDetails = sequelize.define("delivery_details", {
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
    customer_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "customer_details",
        key: "id",
      },
    },
    dvd_details: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
    total_dvd_delivered: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    delivery_status: {
      type: Sequelize.STRING,
      values: ["Ordered", "InTransit", "Delivered"],
      allowNull: true,
    },
    delivered_date: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    delivery_charges: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return deliveryDetails;
};
