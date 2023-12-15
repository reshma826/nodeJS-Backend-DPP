const Sequelize = require("sequelize");
const config = require("../config/config");
const sequelizeInstance = new Sequelize(
  config.postgres_sql_config.DB,
  config.postgres_sql_config.USER,
  config.postgres_sql_config.PASSWORD,
  {
    host: config.postgres_sql_config.HOST,
    port: config.postgres_sql_config.PORT,
    dialect: config.postgres_sql_config.dialect,
    pool: {
      max: parseInt(config.postgres_sql_config.pool.max),
      min: parseInt(config.postgres_sql_config.pool.min),
      acquire: config.postgres_sql_config.pool.acquire,
      idle: config.postgres_sql_config.pool.idle,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.deliveryDetails = require("./deliveryDetails.model")(
  sequelizeInstance,
  Sequelize
);
db.user = require("./user.model")(sequelizeInstance, Sequelize);
db.customer = require("./customer.model")(sequelizeInstance, Sequelize);
db.pickUpDetails = require("./pickUp.model")(sequelizeInstance, Sequelize);

module.exports = db;
