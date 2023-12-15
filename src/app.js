const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config/config");
// const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middleware/error");
const ApiError = require("./utils/ApiError");
const path = require("path");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
const corsConfig = {
  origin: config.corsOrigin,
  credentials: true,
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  // app.use('/api/v3/accounts/_sendOTP', authLimiter);
}

app.use((req, res, next) => {
  res.set(
    "Content-Security-Policy",
    "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
  );
  next();
});

// v1 api routes
app.use("/api", routes);

app.use("/static", express.static(path.join(__dirname, "public")));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
module.exports = app;
