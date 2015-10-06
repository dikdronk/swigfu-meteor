Meteor.publish('deals', function() {
  return Deals.find();
});

Meteor.publish('comments', function() {
  return Comments.find();
});
