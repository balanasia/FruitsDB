//jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB");

//create a mongoose schema for this DB
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

//create a colleciton model for the schema
const Fruit = mongoose.model("Fruit", fruitSchema);

//new fruit object
const fruit = new Fruit ({
  name: "Apple",
  rating: 4,
  review: "Makes me hungry"
});


const nectarine = new Fruit ({
  name: "nectarine",
  rating: 8,
  review: "Sweet and yummy"
});

const banana = new Fruit ({
  name: "Banana",
  rating: 7,
  review: "Versatile and full of potassium"
});

const mandarin = new Fruit ({
  name: "Mandarin",
  rating: 7,
  review: "Satisfying to peel and eat"
});

//saves the object into the collection
Fruit.insertMany([nectarine, banana, mandarin], function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully saved all fruit to fruitDB");
  }
});


// //mongoDB code to insert objects into the colleciton
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([
//       {
//         name: "Apple",
//         score: 4,
//         review: "Makes me hungry"
//       },
//       {
//         name: "Orange",
//         score: 3,
//         review: "Mid"
//       },
//       {
//         name: "Banana",
//         score: 7,
//         review: "Pretty universal, love it"
//       }
//   ],
//   function (err, result)
//   {
//     assert.equal(err, null);
//     assert.equal(3, result.insertedCount);
//     assert.equal(3, Object.keys(result.insertedIds).length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

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
