Meteor.publish('deals', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Deals.find({}, options);
});

Meteor.publish('singleDeal', function(id) {
  check(id, String)
  return Deals.find(id);
});

Meteor.publish('comments', function(dealId) {
  check(dealId, String);
  return Comments.find({dealId: dealId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
