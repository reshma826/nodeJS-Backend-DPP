const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const customerRoute = require("./customer.route");
const pickUpRoute = require("./pickUp.route");
const deliveryRoute = require("./delivery.route");

const defaultRoutes = [
  {
    path: "/login",
    route: userRoute,
  },
  {
    path: "/customer",
    route: customerRoute,
  },
  {
    path: "/delivery",
    route: deliveryRoute,
  },
  {
    path: "/pickUp",
    route: pickUpRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
