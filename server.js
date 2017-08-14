var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3002);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_njhq2r2d:t5g4t5pg50nbvtl0jfrrt22d45@ds127963.mlab.com:27963/heroku_njhq2r2d";

// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) {
  process.exit(1);
  }

  db = database; // Our database object from mLab

  console.log("Database connection ready");

  // Initialize the app.
  app.listen(app.get('port'), function () {
  console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });
});

// Todo API Routes Will Go Below

// GET all todos
app.get('/todos', function(req, res) {
  db.collection('todos-cc').find({}).toArray((err,docs)=> {
    if (err) {
      handleError(re, err.message, 'Failed to get todos');
    } else {
      res.status(200).json(docs);
    }
  });
});

// POST:  new todos
app.post('/todos', function(req, res) {
  var newTodo = {
    description: req.body.description,
    isComplete: false
  }

  db.collection('todos-cc').insertOne(newTodo, (err, doc)=> {
    if (err) {
        handleError(re, err.message, 'Failed to add todo');
    } else {
      res.status(200).json(doc.ops[0]);
    }
  });
});

// GET single todo - todos/:id
app.get("/todos/:id", function(req, res) {
  db.collection("todos-cc").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get todo by _id");
    } else {
      res.status(200).json(doc);
    }
  });
});

// PUT: update a todo by id
app.put("/todos/:id", function(req, res) {
  var updateTodo = req.body;
  delete updateTodo._id;

  db.collection("todos-cc").updateOne({_id: new ObjectID(req.params.id)}, updateTodo, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update todo");
    } else {
      res.status(204).end();
    }
  });
});

// DELETE: delete a todo by id
app.delete("/todos/:id", function(req, res) {
  db.collection("todos-cc").deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete todo");
    } else {
      res.status(204).end();
    }
  });
});

// Error handler for the api
function handleError(res, reason, message, code) {
  console.log("API Error: " + reason);
  res.status(code || 500).json({"Error": message});
}
