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

    //Update Comment commentsCount
    Deals.update(comment.dealId, {$inc: {commentsCount: 1}});

    //Create the comment and save the _id
    comment._id = Comments.insert(comment);

    //Create user notification
    createCommentNotification(comment);

    return comment._id;
  }
});
