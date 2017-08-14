var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID,
db;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_njhq2r2d:t5g4t5pg50nbvtl0jfrrt22d45@ds127963.mlab.com:27963/heroku_njhq2r2d";
// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) {
  process.exit(1);
  }

  db = database; // Our database object from mLab

  console.log("Database connection ready");

});


// Todo API Routes Will Go Below

// GET all todos
router.get('/', function(req, res) {
  db.collection('todos-cc').find({}).toArray((err,docs)=> {
    if (err) {
      handleError(re, err.message, 'Failed to get todos');
    } else {
      res.status(200).json(docs);
    }
  });
});

// POST:  new todos
router.post('/', function(req, res) {
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
router.get("/:id", function(req, res) {
  db.collection("todos-cc").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get todo by _id");
    } else {
      res.status(200).json(doc);
    }
  });
});

// PUT: update a todo by id
router.put("/:id", function(req, res) {
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
router.delete("/:id", function(req, res) {
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

module.exports = router;
