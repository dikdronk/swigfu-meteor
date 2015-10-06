Template.dealItem.helpers({
  ownDeal: function() {
    return this.userId === Meteor.userId();
  }
});
