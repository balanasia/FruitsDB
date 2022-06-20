//jshint esversion:6

//1. Switch out mongoDB declaration
// for mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB");

//2. create a mongoose schema for this DB
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "We need the name of the fruit!"]
  },
  rating: {
    type: Number,
    //adds a min and max rating
    min: 1,
    max: 10
  },
  review: String
});

//3. Practice and create another schema for Person

const personSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Name your person"]
  },
  age: Number,
  favoriteFruit: fruitSchema
});

//4. create a colleciton model for the Fruit schema
const Fruit = mongoose.model("Fruit", fruitSchema);

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 8,
  review: "More like fine apple, am I right?"
});

//new fruit object
const fruit = new Fruit ({
  name: "Apple",
  rating: 4,
  review: "Makes me hungry"
});


const nectarine = new Fruit ({
  name: "Nectarine",
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

//5. Save the fruits into collection
Fruit.insertMany([nectarine, banana, mandarin, pineapple], function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully saved all fruit to fruitDB");
  }
});

//6. Create a new person
//and establish a relationship
//with Fruit collection

const person = new Person(
  {
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});

person.save();

//7. Update previously created person
//with specified id to have relationship
//with fruit collection
Person.updateOne({id: "62b091a0932754c2b2d36643"}, {favoriteFruit: banana}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Person info successfully updated");
  }
});

//8. Find the names of akl o the saved fruits
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    //this closes mongoose connection afteyr 500ms
    setTimeout(function() { mongoose.connection.close();}, 500);

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

//9. update an element with specified ID
Fruit.updateOne({_id: "62b0991c0063c2f4c4fc6ee2"}, {review: "OOOH GOOD HEAVENS"}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully Updated");
  }
});

//10. Remove one element that matches the criteria
Fruit.deleteOne({name: "Apple"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Apple succeffuly deleted");
  }
});

//11. Remove all element that matches criteria
Fruit.deleteMany({name: "Mandarin"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Mandarin succeffuly deleted");
  }
});
