var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var todos = require('./todo-routes');

var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3002);
app.use(cors());
app.use(express.static("www"));
app.use('/todos', todos);





  // Initialize the app.
  app.listen(app.get('port'), function () {
  console.log("backend server running on 3002");
  });




// Error handler for the api
function handleError(res, reason, message, code) {
  console.log("API Error: " + reason);
  res.status(code || 500).json({"Error": message});
}
