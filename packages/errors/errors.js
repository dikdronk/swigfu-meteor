// Write your package code here!
Errors = {
  //Local collection
  collection: new Mongo.Collection(null),

  throw: function(message) {
    Errors.collection.insert({message: message, seen: false})
  }
};