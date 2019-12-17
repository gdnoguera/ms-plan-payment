
const express = require("express"),
  bodyParser = require("body-parser"),
  config = require("../Config/Config"),
  app = express();

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(require("../Controller/GetPaymentPlanService"))
  .listen(config.port, () => {
    console.log("mockup corriendo el puerto:", config.port);
  });