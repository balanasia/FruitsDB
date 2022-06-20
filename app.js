//jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});


const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
      {
        name: "Apple",
        score: 4,
        review: "Makes me hungry"
      },
      {
        name: "Orange",
        score: 3,
        review: "Mid"
      },
      {
        name: "Banana",
        score: 7,
        review: "Pretty universal, love it"
      }
  ],
  function (err, result)
  {
    assert.equal(err, null);
    assert.equal(3, result.insertedCount);
    assert.equal(3, Object.keys(result.insertedIds).length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
