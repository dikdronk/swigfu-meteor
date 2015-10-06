Meteor.publish('deals', function() {
  return Deals.find();
});

Meteor.publish('comments', function(dealId) {
  check(dealId, String);
  return Comments.find({dealId: dealId});
});

Meteor.publish('notifications', function() {
  return Notifications.find();
});
