var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Gets all stores
  .get(function (req, res) {
    db.Store.findAll().then(function (stores) {
      if (stores.length === 0) {
        res.json('There are no stores in the database');
      }
      res.json(stores);
    });
  });

router.route('/id/:storeid')
  // Get all store object storeid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.storeid)) {
      res.json('Store id is not a valid UUID');
    }
    db.Store.findOne({
      where: {
        id: req.params.storeid
      }
    }).then(function (store) {
      if (!store) {
        res.json('There is no store for this store id');
      } 
      res.json(store)
    });
  });

module.exports = router;