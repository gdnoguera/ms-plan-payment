const express = require("express");
const app = express();
const service = "GetPaymentPlanService";
const response = require("../Model/Response");
const { check, validationResult } = require('express-validator');
const Request = require("request");

var servNameConsume='GetFeature';
var hostNameConsume='https://simulador2019.herokuapp.com'
var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/simulador", {native_parser : true});


let request = {
  skuProducto: '',
  numberQuotas: '',
  interest: '',
  iva: '',
  balanceDefer: '',
  fixedfee: ''
};

/** 
   * @description Método post expuesto al usuario
   * @autor Gregorio Noguera
   * @param {string} skuProducto Código del producto que selecciono el usuario para simular
   * @param {number} numberQuotas Número de cuotas que desea rediferir el saldo
   * @param {number} interest interes que se le va a aplicar al calculó del plan de pagos
   * @param {number} iva iva que se le va a aplicar al calculó del plan de pagos
   * @param {number} balanceDefer Saldo a diferir total con el que se calcula el plan de pagos
   * @param {number} fixedfee cuota fija con el que se calcúla el plan de pagos
   * @return {json} json con el plan de pagos generado
*/
app.post(`/${service}/request`,
[check('numberQuotas').isNumeric(),check('interest').isNumeric(),check('iva').isNumeric(),
  check('balanceDefer').isNumeric(),check('fixedfee').isNumeric()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      Request.get(`${hostNameConsume}/${servNameConsume}/${req.body.numberQuotas}/${req.body.interest}/${req.body.iva}/${req.body.balanceDefer}/${req.body.fixedfee}`, (error, response, body) => {
        if (error != null) {
          res.send(error);
        } else {
         // saveData(JSON.parse(body));
          res.send(JSON.parse(body));
        }
      });
    }
  });

//   function saveData(data){

//   db.collection('planPagos').insert(data, function(error, record){
//     if (error) throw error;
//     console.log("data saved");
// });

// }

module.exports = app;