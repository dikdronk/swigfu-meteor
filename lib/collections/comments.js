Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      dealId: String,
      body: String
    });

    var user = Meteor.user();
    var deal = Deals.findOne(commentAttributes.dealId);

    if (!deal)
      throw new Meteor.Error('invalid-comment', 'You must enter comment text');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      submittedBy: user.username,
      submitted: new Date()
    });

    return Comments.insert(comment);
  }
});
