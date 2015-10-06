Notifications = new Mongo.Collection('notification');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification =function(comment) {
  var deal = Deals.findOne(comment.dealId);
  if (comment.userId !== deal.userId) {
    Notifications.insert({
      userId: deal.userId,
      dealId: deal._id,
      commentId: comment._id,
      commenterName: comment.submittedBy,
      read: false
    });
  }
};
