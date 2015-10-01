//Create Deals Collection

Deals = new Mongo.Collection('deals');

//Allow signed in users to submit a deal
Deals.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});