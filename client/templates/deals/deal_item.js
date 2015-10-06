Template.dealItem.helpers({
  ownDeal: function() {
    return this.userId === Meteor.userId();
  },
  commentsCount: function() {
    return Comments.find({dealId: this._id}).count();
  }
});
