const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "demo", "test")
      .required(),
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  postgres_sql_config: {
    HOST: envVars.POSTGRES_SQL_HOST,
    USER: envVars.POSTGRES_SQL_USER,
    PASSWORD: envVars.POSTGRES_SQL_PASSWORD,
    DB: envVars.POSTGRES_SQL_DB,
    PORT: envVars.POSTGRES_SQL_PORT,
    dialect: envVars.POSTGRES_SQL_DIALECT,
    pool: {
      max: envVars.POSTGRES_SQL_POOL_MAX,
      min: envVars.POSTGRES_SQL_POOL_MIN,
      acquire: envVars.POSTGRES_SQL_POOL_ACQUIRE,
      idle: envVars.POSTGRES_SQL_POOL_IDLE,
    },
  },
  DELIVERY_CHARGE_PER_DELIVERY: envVars.DELIVERY_CHARGE_PER_DELIVERY,
};
