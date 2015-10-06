Meteor.publish('deals', function() {
  return Deals.find();
});

Meteor.publish('comments', function(dealId) {
  check(dealId, String);
  return Comments.find({dealId: dealId});
});
