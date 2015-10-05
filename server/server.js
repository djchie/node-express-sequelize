// server.js

// BASIC SETUP
// =============================================================================

// Call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var db = require(__dirname + '/models/index');

// Sync the database models
db.sequelize.sync({
  // force: true
});

// Create an express app
var app = express();

// CORS Settings
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// Configure the app to use bodyParser()
// This will let us get the data from post
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set our port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================

var inventoriesRouter = require('./routers/inventoriesRouter');
var productsRouter = require('./routers/productsRouter');
var storesRouter = require('./routers/storesRouter');

var router = express.Router();

// All of our routes will console log a status
app.use(function (req, res, next) {
  console.log('==========================================');
  console.log(req.method + ': ' + req.url);
  next();
});

// Ideally, this route sends the index.html
router.get('/', function (req, res) {
  // res.sendFile(__dirname + '/public/views/index.html');
  res.json({
    message: 'Node-Express-Sequelize Server!'
  });
});

// Routes for api/inventories
app.use('/inventories', inventoriesRouter);
// Routes for api/products
app.use('/products', productsRouter);
// Routes for api/stores
app.use('/stores', storesRouter);


// REGISTER OUR ROUTES -------------------------------

// All of our routes will be prefixed with /api in the future when we want to build
// an api
// Right now, to retrieve products, the '/products' route handles getting products 
// and rendering the html
// Ideally, the '/products' route would make a call to the '/api/products' route
// which handles the databases interactions and retrieves data for the '/products'
// route to use to use the data to render
// app.use('/api', router);

// All of our routes will be prefixed with /api
app.use('/api', router);

module.exports = app;