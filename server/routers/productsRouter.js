var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Gets all products
  .get(function (req, res) {
    db.Product.findAll().then(function (products) {
      if (products.length === 0) {
        res.json('There are no products in the database');
      }
      res.json(products);
    });
  });

router.route('/id/:productid')
  // Get all product object productid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.productid)) {
      res.json('Product id is not a valid UUID');
    }
    db.Product.findOne({
      where: {
        id: req.params.productid
      }
    }).then(function (product) {
      if (!product) {
        res.json('There is no product for this product id');
      } 
      res.json(product)
    });
  });

module.exports = router;