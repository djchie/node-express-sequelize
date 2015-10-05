var router = require('express').Router();
var validator = require('validator');
var db = require('../models/index');

router.route('/')
  // Gets all inventories
  .get(function (req, res) {
    db.Inventory.findAll().then(function (inventories) {
      if (inventories.length === 0) {
        res.json('There are no inventories in the database');
      }
      res.json(inventories);
    });
  });

router.route('/id/:inventoryid')
  // Get all inventory object inventoryid
  .get(function (req, res) {
    if (!validator.isUUID(req.params.inventoryid)) {
      res.json('Inventory id is not a valid UUID');
    }
    db.Inventory.findOne({
      where: {
        id: req.params.inventoryid
      }
    }).then(function (inventory) {
      if (!inventory) {
        res.json('There is no inventory for this inventory id');
      } 
      res.json(inventory)
    });
  });

module.exports = router;








