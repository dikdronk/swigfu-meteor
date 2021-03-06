//Create Deals Collection

Deals = new Mongo.Collection('deals');

//Allow edits and deletes
Deals.allow({
  update: function(userId, deal) { return ownsDocument(userId, deal); },
  remove: function(userId, deal) { return ownsDocument(userId, deal); }
});

//Prevent users from editing these fields
Deals.deny({
  update: function(userId, deal, fieldNames) {
    //Only these fields can be edited
    return (_.without(fieldNames, 'dealTitle', 'venueName', 'when').length > 0);
  }
});

//Validates that fields in edit are present
Deals.deny({
  update: function(userId, deal, fieldNames, modifier) {
    //Only these fields can be edited
    var errors = validateDeal(modifier.$set);
    return (errors.dealTitle || errors.venueName || errors.when);
  }
});

validateDeal = function (deal) {
  var errors = {};

  if (!deal.dealTitle)
    errors.dealTitle = "Please tell us what the deal is";

  if (!deal.venueName)
    errors.venueName = "Don't forget to tell us where to go";

  if (!deal.when)
    errors.when = "We have to know when this is happening";

  return errors;
}

Meteor.methods({
  dealInsert: function(dealAttributes) {
    check(Meteor.userId(), String);
    check(dealAttributes, {
      dealTitle: String,
      venueName: String,
      when: String
    });

    var errors = validateDeal(dealAttributes);
    if (errors.dealTitle || errors.venueName || errors.when)
      throw new Meteor.Error('invalid-post', "You must set the required fields");

    //Deal with same details code

    /*
    var dealWithSameDetails = Deals.findOne({dealTitle: dealAttributes.dealTitle});
    if (dealWithSameDetails) {
      return {
        dealExists: true,
        _id: dealWithSameDetails._id
      }
    }
    */

    var user = Meteor.user();
    var deal = _.extend(dealAttributes, {
      userId: user._id,
      submittedBy: user.username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    var dealId = Deals.insert(deal);

    return {
      _id: dealId
    };
  },

  upvote: function(dealId) {
    check(this.userId, String);
    check(dealId, String);

    var affected = Deals.update({
      _id: dealId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "Nope to that vote!");
  }
});
