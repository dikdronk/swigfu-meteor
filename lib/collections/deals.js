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
    return (_.without(fieldNames, 'dealTitle', 'venueName').length > 0);
  }
});

Meteor.methods({
  dealInsert: function(dealAttributes) {
    check(Meteor.userId(), String);
    check(dealAttributes, {
      dealTitle: String,
      venueName: String,
      when: String
    });

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
      submitted: new Date()
    });

    var dealId = Deals.insert(deal);

    return {
      _id: dealId
    };
  }
});