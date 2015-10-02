//List all the deals in the Collection

Template.dealsList.helpers({
  deals: function() {
    return Deals.find({}, {sort: {submitted: -1}});
  }
});